const jwt = require("jsonwebtoken");
const orderProductModel = require("../models/productOrderedModel");

const secretKey = "secretKey1234";

exports.addProductToOrder = async (req, res) => {
  try {
    // const token = req.cookies.cookie;

    // if (!token) {
    //   return res.status(401).json({
    //     status: "fail",
    //     message: "Unauthorized access, please log in",
    //   });
    // }

    // const decoded = jwt.verify(token, secretKey);

    const { orderItems: productsArray, user } = req.body;

    // if (user !== decoded.id) {
    //   return res.status(401).json({
    //     status: "fail",
    //     message: "Unauthorized access, please log in",
    //   });
    // }

    const newOrder = await orderProductModel.create({
      user: user,
      products: productsArray,
    });
    res.status(201).json({
      status: "success",
      data: {
        newOrder,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderProductModel.find();
    res.status(200).json({
      status: "success",
      data: {
        totalOrders: orders.length,
        orders,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getOrderByUser = async (req, res) => {
  try {
    // const token = req.cookies.cookie;

    // if (!token) {
    //   return res.status(401).json({
    //     status: "fail",
    //     message: "Unauthorized access, please log in",
    //   });
    // }

    // const decoded = jwt.verify(token, secretKey);

    // const { user } = req.body;
    const userID = req.query.UserId;

    // if (user !== decoded.id) {
    //   return res.status(401).json({
    //     status: "fail",
    //     message: "Unauthorized access, please log in",
    //   });
    // }
    const orders = await orderProductModel
      .find({ user: userID })
      .sort({ createdAt: -1 })
      .populate({
        path: "products.product",
        model: "Product",
      });

    if (!orders) {
      return res.status(404).json({
        status: "fail",
        message: "No Order Found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        totalOrders: orders.length,
        orders,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.query.orderId;
    const deletedOrder = await orderProductModel.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({
        status: "fail",
        message: "Order not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
