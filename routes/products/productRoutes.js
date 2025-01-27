const express = require("express");
const { verifyToken } = require("../../services/middleWare");
const productController = require("../../services/productServices");

const router = express.Router();

router
  .route("/getAllProducts")
  .get(verifyToken, productController.getAllProducts);

router
  .route("/product")
  .post(productController.addProduct)
  .get(productController.getOneProduct)
  .delete(productController.deleteProduct);

router.route("/productTest").post(productController.addProductTest);

module.exports = router;
