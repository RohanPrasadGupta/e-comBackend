const express = require("express");
const { verifyToken } = require("../../services/middleWare");

const cartController = require("../../services/cartServices");

const router = express.Router();

router
  .route("/toCart")
  .post(cartController.addProductToCart)
  .get(cartController.getCartItems)
  .delete(cartController.deleteProductFromCart);

router.route("/updateCart").post(cartController.updateQuantityOfOrder);

module.exports = router;
