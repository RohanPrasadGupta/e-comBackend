const express = require("express");
const orderController = require("../../services/productOrderServices");
const { verifyTokenAndAdmin } = require("../../services/middleWare");

const router = express.Router();

router
  .route("/order")
  .post(orderController.addProductToOrder)
  .get(orderController.getOrderByUser);

router
  .route("/getAllOrders")
  .get(verifyTokenAndAdmin, orderController.getAllOrders);

module.exports = router;
