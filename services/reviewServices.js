const ReviewProduct = require("../models/reviewProductModel");
const NewProductModel = require("../models/testproduct");
const productModel = require("../models/product");

exports.addReview = async (req, res) => {
  try {
    const { product, reviewerName, rating, comment, reviewerEmail } = req.body;

    const newReview = new ReviewProduct({
      product,
      reviewerName,
      rating,
      comment,
      reviewerEmail,
    });
    const savedReview = await newReview.save();

    await productModel.findByIdAndUpdate(
      product,
      { $push: { reviews: savedReview._id } },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json({
      status: "success",
      data: savedReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error adding review", error });
  }
};
