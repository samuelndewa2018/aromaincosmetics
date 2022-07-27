const mongoose = require("mongoose");

const newproductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name of a product"],
    trim: true,
    maxLength: [50, "Product name not exceed than 50 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description of your product"],
    maxlength: [10000, "Description is can not exceed than 10000 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please add a price for your product"],
    maxLength: [8, "Price can not exceed than 8 characters"],
  },
  offerPrice: {
    type: String,
    maxLength: [8, "Discount price can not exceed than 8 characters"],
  },
  color: {
    type: String,
  },
  size: {
    type: String,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please add a category of your product"],
  },
  Stock: {
    type: Number,
    required: [true, "Please add some stoke for your product"],
    maxLength: [10, "Stock can not exceed than 10 characters"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },

      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
      time: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("NewProduct", newproductSchema);
