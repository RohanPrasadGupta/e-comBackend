const jwt = require("jsonwebtoken");
const cartModel = require("../models/cartModel");

const secretKey = "secretKey1234";

exports.addProductToCart = async (req, res) => {
  try {
    const token = req.cookies.cookieTCart;
    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access, please log in",
      });
    }

    const decoded = jwt.verify(token, secretKey);

    const { product, quantity, user } = req.body;

    if (user !== decoded.id) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access, please log in",
      });
    }

    const cart = await cartModel.findOne({ user: user });

    if (!cart) {
      const newCart = await cartModel.create({
        user: user,
        products: [{ product, quantity }],
      });

      return res.status(201).json({
        status: "created new cart success",
        data: {
          cart: newCart,
        },
      });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === product
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product, quantity });
    }

    const updatedCart = await cart.save();

    return res.status(201).json({
      status:
        productIndex > -1
          ? "Quantity updated successfully"
          : "New item added to cart",
      data: {
        cart: updatedCart,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.getCartItems = async (req, res) => {
  try {
    const token = req.cookies.cookieTCart;

    console.log("token check", token);

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access, please log in",
      });
    }

    const decoded = jwt.verify(token, secretKey);
    const userID = req.query.UserId;

    if (userID !== decoded.id) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access, please log in",
      });
    }

    const cart = await cartModel.findOne({ user: userID }).populate({
      path: "products.product",
      model: "Product",
    });

    if (!cart) {
      return res.status(200).json({
        status: "success",
        data: {
          cart: [],
        },
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        cart,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    const token = req.cookies.cookieTCart;

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access, please log in",
      });
    }

    const decoded = jwt.verify(token, secretKey);

    const productId = req.query.productId;
    const userID = req.query.UserId;

    if (userID !== decoded.id) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized access, please log in",
      });
    }

    const cart = await cartModel.findOne({ user: userID });

    if (!cart) {
      return res.status(404).json({
        status: "fail",
        message: "Cart not found",
      });
    }

    const productIndex = cart.products.findIndex(
      (item) => item._id.toString() === productId
    );

    if (productIndex === -1) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found in cart",
      });
    }

    const updatedProducts = cart.products.filter(
      (item) => item._id.toString() !== productId
    );

    cart.products = updatedProducts;
    await cart.save();

    return res.status(200).json({
      status: "success",
      message: "Product removed from cart",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};
