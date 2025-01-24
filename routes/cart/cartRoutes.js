const express = require("express");
const cartController = require("../../services/cartServices");

const router = express.Router();

router.route("/addProductToCart").post(cartController.addProductToCart);

module.exports = router;
