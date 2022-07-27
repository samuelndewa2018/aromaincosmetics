const NewProduct = require("../models/NewProductModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Features = require("../utils/Features");
const cloudinary = require("cloudinary");

// create Product => /api/v2/admin/product/new
exports.createNewProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];
  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "newproducts",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  // req.body.user = req.user._id; //  req.body.user = req.user.id ==> todo what it does... comment it out to add product
  const newproduct = await NewProduct.create(req.body);
  res.status(201).json({
    success: true,
    newproduct,
  });
});

// get All Products => /api/v2/products
exports.getAllNewProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 30;
  const productsCount = await NewProduct.countDocuments();
  const feature = new Features(NewProduct.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const newproducts = await feature.query;
  res.status(200).json({
    success: true,
    newproducts,
    productsCount,
    resultPerPage,
  });
});

// Update Product => /api/v1/admin/product/:id
exports.updateNewProduct = catchAsyncErrors(async (req, res, next) => {
  let newproduct = await NewProduct.findById(req.params.id);
  if (!newproduct) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    // Delete image from cloudinary
    for (let i = 0; i < newproduct.images.length; i++) {
      await cloudinary.v2.uploader.destroy(newproduct.images[i].public_id);
    }
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "newproducts",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }
  newproduct = await NewProduct.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useUnified: false,
  });
  res.status(200).json({
    success: true,
    newproduct,
  });
});

// delete Product
exports.deleteNewProduct = catchAsyncErrors(async (req, res, next) => {
  const newproduct = await NewProduct.findById(req.params.id);
  if (!newproduct) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }
  // Deleting images from cloudinary
  for (let i = 0; 1 < newproduct.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      newproduct.images[i].public_id
    );
  }
  await newproduct.remove();
  res.status(200).json({
    success: true,
    message: "Product deleted succesfully",
  });
});

// single Product details
exports.getSingleNewProduct = catchAsyncErrors(async (req, res, next) => {
  const newproduct = await NewProduct.findById(req.params.id);
  if (!newproduct) {
    return next(new ErrorHandler("Product is not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    newproduct,
  });
});

// Create New Review or Update the review
exports.createNewProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    email: req.user.email,
    rating: Number(rating),
    comment,
    url: req.user.avatar.url,
  };
  const newproduct = await NewProduct.findById(productId);
  const isReviewed = newproduct.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );
  if (isReviewed) {
    newproduct.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    newproduct.reviews.push(review);
    newproduct.numOfReviews = newproduct.reviews.length;
  }
  let avg = 0;
  newproduct.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  newproduct.ratings = avg / newproduct.reviews.length;
  await newproduct.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

// Get All reviews of a single product
exports.getSingleNewProductReviews = catchAsyncErrors(
  async (req, res, next) => {
    const newproduct = await Product.findById(req.query.id);
    if (!newproduct) {
      return next(new ErrorHandler("Product is not found with this id", 404));
    }
    res.status(200).json({
      success: true,
      reviews: newproduct.reviews,
    });
  }
);

// Delete Review --Admin
exports.deleteNewReview = catchAsyncErrors(async (req, res, next) => {
  const newproduct = await NewProduct.findById(req.query.productId);
  if (!newproduct) {
    return next(new ErrorHandler("Product not found with this id", 404));
  }
  const reviews = newproduct.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  const numOfReviews = reviews.length;
  await NewProduct.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
