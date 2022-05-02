const productsService = require("./products.service")

function read(req, res, next) {
  const { product: data } = res.locals
  res.json({ data });
}

function list(req, res, next) {
  productsService
    .list()
    .then((data) => { res.json({ data }) })
    .catch(next)
}

function productExists(req, res, next) {
  productsService
    .read(req.params.productId)
    .then((product) => {
      if (product) { // it gives an empty array when there's nothing
        res.locals.product = product // storing to locals like usual
        return next()
      }
      next({ status: 404, message: `Product cannot be found.` })
    })
    .catch(next)
}

module.exports = {
  read: [productExists, read],
  list: [list],
};
