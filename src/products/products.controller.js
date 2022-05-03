const productsService = require("./products.service")

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

module.exports = {
  read: [productExists, read],
  list: [list],
};
