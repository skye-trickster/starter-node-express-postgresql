const suppliersService = require("./suppliers.service.js");
const hasProperties = require("../errors/hasProperties");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary.js");

const VALID_PROPERTIES = [
  "supplier_name",
  "supplier_address_line_1",
  "supplier_address_line_2",
  "supplier_city",
  "supplier_state",
  "supplier_zip",
  "supplier_phone",
  "supplier_email",
  "supplier_notes",
  "supplier_type_of_goods",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
}

const hasRequiredProperties = hasProperties("supplier_name", "supplier_email");

// this function requires asyncErrorBoundary for error handling.
async function create(request, response, next) {
  const data = await suppliersService.create(request.body.data)
  response.status(201).json({ data })
}

async function supplierExists(request, response, next) {
  try {
    const supplier = await suppliersService.read(request.params.supplierId)
    if (supplier) {
      response.locals.supplier = supplier
      return next()
    }
    next({ status: 404, message: `Supplier cannot be found.` })
  } catch (error) {
    next(error)
  }
}

async function update(request, response, next) {
  const updatedSupplier = {
    ...request.body.data,
    supplier_id: response.locals.supplier.supplier_id
  }
  try {
    const data = await suppliersService.update(updatedSupplier)
    response.json({ data })
  } catch (error) {
    next(error)
  }
}

async function destroy(request, response, next) {
  await suppliersService.delete(res.locals.supplier.supplier_id)
  response.sendStatus(204)
}

module.exports = {
  create: [hasOnlyValidProperties, hasRequiredProperties, asyncErrorBoundary(create)],
  update: [
    supplierExists,
    hasOnlyValidProperties,
    hasRequiredProperties,
    update,
  ],
  delete: [supplierExists, asyncErrorBoundary(destroy)],
};
