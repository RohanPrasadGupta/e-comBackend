const express = require("express");
const { verifyToken } = require("../../services/middleWare");

const cartController = require("../../services/cartServices");

const router = express.Router();

router
  .route("/toCart")
  .post(verifyToken, cartController.addProductToCart)
  .get(verifyToken, cartController.getCartItems)
  .delete(verifyToken, cartController.deleteProductFromCart);

module.exports = router;
