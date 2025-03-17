const express = require("express");
const orderController = require("../../services/productOrderServices");
const { verifyTokenAndAdmin } = require("../../services/middleWare");

const router = express.Router();

router
  .route("/order")
  .post(orderController.addProductToOrder)
  .get(orderController.getOrderByUser)
  .delete(orderController.cancelOrder);

router.route("/getAllOrders").get(orderController.getAllOrders);

module.exports = router;
