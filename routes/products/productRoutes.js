const express = require("express");
const productController = require("../../services/productServices");

const router = express.Router();

router.route("/getAllProducts").get(productController.getAllProducts);

router
  .route("/product")
  .post(productController.addProduct)
  .get(productController.getOneProduct)
  .delete(productController.deleteProduct);

router.route("/productTest").post(productController.addProductTest);

// const allProduct = []; // Initialize the array to store all products

// const products = async (num) => {
//   let prodData;
//   await fetch(`https://dummyjson.com/products/${num}`)
//     .then((res) => res.json())
//     .then((data) => {
//       prodData = JSON.stringify(data);
//     });
//   allProduct.push(prodData);
// };

// const fetchAllProducts = async () => {
//   for (let i = 1; i <= 100; i++) {
//     await products(i);
//   }
//   console.log("allProduct", allProduct);
//   console.log("allProduct", allProduct.length);
// };

// fetchAllProducts();

module.exports = router;
