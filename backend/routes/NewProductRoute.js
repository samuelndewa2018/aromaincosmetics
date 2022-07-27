const express = require("express");
const {
  getAllNewProducts,
  createNewProduct,
  updateNewProduct,
  deleteNewProduct,
  getSingleNewProduct,
  createNewProductReview,
  getSingleNewProductReviews,
  deleteNewReview,
} = require("../controllers/NewProductController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/new/products").get(getAllNewProducts);
router.route("/new/product/new").post(createNewProduct);
router
  .route("/new/product/review")
  .post(isAuthenticatedUser, createNewProductReview);
router
  .route("/admin/new/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllNewProducts);
router
  .route("/new/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateNewProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteNewProduct)
  .get(getSingleNewProduct);
router
  .route("/new/reviews")
  .get(getSingleNewProductReviews)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteNewReview);

module.exports = router;
