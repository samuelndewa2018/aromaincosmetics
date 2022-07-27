const express = require("express");
const {
  createUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  userDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
  contactsForm,
  createGoogleUser,
  loginUserGoogle,
  receiveOrder,
  receiveUserOrder,
  subscibeNewsletter,
  orderForm,
  creatorLog,
} = require("../controllers/UserController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(createUser);
router.route("/google/register").post(createGoogleUser);
router.route("/login").post(loginUser);
router.route("/google/login").post(loginUserGoogle);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update/info").put(isAuthenticatedUser, updateProfile);
router.route("/me").get(isAuthenticatedUser, userDetails);
router.route("/contact/form").post(contactsForm);
router.route("/receive/order").post(receiveOrder);
router.route("/receive/order/form").post(orderForm);
router.route("/receive/order/user").post(receiveUserOrder);
router.route("/api/receive/email").post(subscibeNewsletter);
router.route("/api/creator/log").post(creatorLog);
router
  .route("/admin/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
