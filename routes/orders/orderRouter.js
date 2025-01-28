const express = require("express");
const orderController = require("../../services/productOrderServices");

const router = express.Router();

router
  .route("/order")
  .post(orderController.addProductToOrder)
  .get(orderController.getOrderByUser);

router.route("/getAllOrders").get(orderController.getAllOrders);

module.exports = router;
