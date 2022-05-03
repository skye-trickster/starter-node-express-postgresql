const router = require("express").Router({ mergeParams: true });
const controller = require("./products.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:productId([0-9]+)").get(controller.read).all(methodNotAllowed); // ([0-9]+): regex, must contains 1+ digits
router.route("/out-of-stock-count").get(controller.listOutOfStockCount).all(methodNotAllowed);
router.route("/price-summary").get(controller.listPriceSummary).all(methodNotAllowed);
router.route("/total-weight-by-product").get(controller.listTotalWeightByProduct).all(methodNotAllowed);
router.route("/total").get(controller.count).all(methodNotAllowed)
//correction: [0-9]+ with the + outside gives only digits.
module.exports = router;
