const mongoose = require("mongoose");

const productOrderedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      orderedPrice: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["pending", "delivered", "cancelled"],
        default: "pending",
      },
    },
  ],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("orders", productOrderedSchema);
