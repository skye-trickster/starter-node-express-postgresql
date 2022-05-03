const productsService = require("./products.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

function read(req, res, next) {
  const { product: data } = res.locals
  res.json({ data });
}

async function list(request, response, next) {
  try {
    const data = await productsService.list()
    response.json({ data })
  } catch (error) {
    next(error);
  }
}

async function productExists(request, response, next) {
  try {
    console.log(typeof request.params.productId)
    const product = await productsService.read(request.params.productId)
    if (product) { // it gives an empty array when there's nothing
      response.locals.product = product // storing to locals like usual
      return next()
    }
    next({ status: 404, message: `Product cannot be found.` })
  } catch (error) {
    next(error)
  }
}

async function listOutOfStockCount(request, response, next) {
  response.json({ data: await productsService.listOutOfStockCount() })
}

async function getTotalCount(request, response, next) {
  const { count } = await productsService.count() // don't forget that count is returned as a string
  response.json({ data: { "count": parseInt(count) } })
}

async function listPriceSummary(request, response, next) {
  response.json({ data: await productsService.listPriceSummary() })
}

async function listTotalWeightByProduct(request, response, next) {
  response.json({ data: await productsService.listTotalWeightByProduct() })
}

module.exports = {
  read: [productExists, read],
  list: [list],
  listOutOfStockCount: [asyncErrorBoundary(listOutOfStockCount)],
  listPriceSummary: [asyncErrorBoundary(listPriceSummary)],
  listTotalWeightByProduct: [asyncErrorBoundary(listTotalWeightByProduct)],
  count: [asyncErrorBoundary(getTotalCount)]
};
