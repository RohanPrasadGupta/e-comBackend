const cartModel = require("../models/cartModel");

exports.addProductToCart = async (req, res) => {
  try {
    const { product, quantity, user } = req.body;

    const cart = await cartModel.findOne({ user: user });

    // If no cart exists, create a new one
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

    // Check if the product already exists in the cart
    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === product
    );

    if (productIndex > -1) {
      // Product exists, update its quantity
      cart.products[productIndex].quantity += quantity;
    } else {
      // Product does not exist, add it to the cart
      cart.products.push({ product, quantity });
    }

    // Save the updated cart
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
