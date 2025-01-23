const mongoose = require("mongoose");

const newProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
  },
  rating: {
    rate: {
      type: Number,
    },
    count: {
      type: Number,
    },
  },
  stock: {
    type: Number,
  },
  tags: {
    type: [String],
  },
  brand: {
    type: String,
  },
  sku: {
    type: String,
  },
  weight: {
    type: Number,
  },
  dimensions: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    depth: {
      type: Number,
    },
  },
  warrantyInformation: {
    type: String,
  },
  shippingInformation: {
    type: String,
  },
  availabilityStatus: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ReviewProduct",
    },
  ],
  returnPolicy: {
    type: String,
  },
  minimumOrderQuantity: {
    type: Number,
  },
  meta: {
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
    barcode: {
      type: String,
    },
    qrCode: {
      type: String,
    },
  },
  images: {
    type: [String],
  },
  thumbnail: {
    type: String,
  },
});

const NewProduct = mongoose.model("NewProduct", newProductSchema);

module.exports = NewProduct;
