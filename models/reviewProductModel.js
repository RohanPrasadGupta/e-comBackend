const mongoose = require("mongoose");
const NewProduct = require("./testproduct");

const reviewProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: NewProduct,
    required: true,
  },
  reviewerName: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reviewerEmail: {
    type: String,
    required: true,
  },
});

const ReviewProduct = mongoose.model("ReviewProduct", reviewProductSchema);

module.exports = ReviewProduct;
