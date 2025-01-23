const express = require("express");
const reviewController = require("../../services/reviewServices");

const router = express.Router();

router.route("/addReview").post(reviewController.addReview);

module.exports = router;
