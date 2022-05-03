const router = require("express").Router({ mergeParams: true });
const controller = require("./products.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);
router.route("/:productId([0-9]+)").get(controller.read).all(methodNotAllowed); // ([0-9]+): regex, must contains 1+ digits
//correction: [0-9]+ with the + outside gives only digits.
module.exports = router;
