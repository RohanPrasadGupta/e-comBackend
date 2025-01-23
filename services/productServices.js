const productModel = require("../models/product");
const NewProductModel = require("../models/testproduct");

exports.addProduct = async (req, res) => {
  try {
    const newProduct = await productModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await productModel.find().populate("reviews");
    res.status(200).json({
      status: "success",
      totalProducts: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error,
    });
  }
};

exports.getOneProduct = async (req, res) => {
  console.log(req.query.id);
  try {
    const product = await productModel.findById(req.query.id);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.query.id);
    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }
    res.status(200).json({
      status: "success deleted",
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.addProductTest = async (req, res) => {
  try {
    const newProduct = await NewProductModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newProduct,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
