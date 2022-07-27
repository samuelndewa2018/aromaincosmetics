const User = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken.js");
const sendMail = require("../utils/sendMail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { OAuth2Client } = require("google-auth-library");

// Register user => /api/v1/register
exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  try {
    await sendMail({
      email: email,
      subject: `Welcome to Inners`,
      message: `Hello ${name}, \n\n Welcome to Inners Online Market. \n\n We're Happy Having you Abord.`,
    });
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//register with google
exports.createGoogleUser = catchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email } = req.body;
  const password = process.env.REGISTER_PASSWORD_TOKEN;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  try {
    await sendMail({
      email: email,
      subject: `Welcome to Inners`,
      message: `Hello ${name}, \n\n Welcome to Inners Online Market. \n\n We're Happy Having you Abord.`,
    });
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Login User => /api/v1/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new ErrorHandler("User not found with this email or password", 401)
    );
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("User not found with this email or password", 401)
    );
  }

  sendToken(user, 201, res);
});

// login with google
exports.loginUserGoogle = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;
  const password = process.env.REGISTER_PASSWORD_TOKEN;
  if (!email || !password) {
    return next(new ErrorHandler("Please enter your email & password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(
      new ErrorHandler("User not found with this email or password", 401)
    );
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(
      new ErrorHandler("User not find with this email or password", 401)
    );
  }

  sendToken(user, 201, res);
});

// Log out user => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out. Bye! See you Later.",
  });
});

// Forgot password => /api/v1/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({
    validateBeforeSave: false,
  });
  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `Hello Client, \n\n Click the link below to reset your password. \n\n ${resetPasswordUrl}\n\n If you have not requested this email, then please ignore it. \n \n Thank you for shopping with Bramuels`;
  try {
    await sendMail({
      email: user.email,
      subject: `Inners Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email}. Check Email to reset your password`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({
      validateBeforeSave: false,
    });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password => /api/v1/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler("Reset password url is invalid or has been expired", 400)
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//  Get user Details => /api/v1/me
exports.userDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update/change User Password => /api/v1/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password not matched with each other", 400));
  }
  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// Update User Profile => /api/v1/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await User.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });
    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }
  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidator: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// *******Admin routes****** //
// Get All users => api/v1/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

// Get Single User Details => api/v1/admin/users/: id
exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User is not found with this id: ${req.params.id}`, 400)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Change user Role => /api/v1/admin/user/: id
exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

// Delete User => api/v1/admin/users/: id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`User is not found with this id: ${req.params.id}`, 400)
    );
  }
  await user.remove();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
// receive email for NewsLetter => /api/v2/receive/email
exports.subscibeNewsletter = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;

  try {
    await sendMail({
      email: `samuelndewa2018@gmail.com`,
      subject: `Subscription to News Letter`,
      message: ` Hello GreenLands,\n\n This is a New User \n\n Please add " ${message} " to NewsLetter`,
    });

    res.status(200).json({
      success: true,
      message: "Email succesfully sent. We will reply soon.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// receive email from contacts => /api/v1/receive/email
exports.contactsForm = catchAsyncErrors(async (req, res, next) => {
  const { name, email, subject, message } = req.body;
  try {
    await sendMail({
      email: `samuelndewa2018@gmail.com`,
      subject: `Contact Us or Report Us`,
      message: ` Hello Inners,\n\n Name: ${name} \n\n Email: ${email}, \n\n Number: ${subject}\n\n Message: ${message}`,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully. We will reply soon.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// receive email from contacts => /api/v1/receive/email
exports.orderForm = catchAsyncErrors(async (req, res, next) => {
  const { name, order, email, subject, message } = req.body;
  try {
    await sendMail({
      email: `samuelndewa2018@gmail.com`,
      subject: `Order Queries and Comments`,
      message: ` Hello Inners,\n\n Order Number: ${order} \n\nName: ${name} \n\n Email: ${email}, \n\n Number: ${subject}\n\n Message: ${message}`,
    });

    res.status(200).json({
      success: true,
      message: "Email sent succesfully. We will reply soon.",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
// receive email to user => /api/v2/receive/order/user
exports.receiveUserOrder = catchAsyncErrors(async (req, res, next) => {
  const { email, message } = req.body;

  try {
    await sendMail({
      email: email,
      subject: `Order Confirmation`,
      message: message,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// receive email for order when ordered => /api/v2/receive/order
exports.receiveOrder = catchAsyncErrors(async (req, res, next) => {
  const { message } = req.body;

  try {
    await sendMail({
      email: `samuelndewa2018@gmail.com`,
      subject: `New Order`,
      message: `Message: ${message}`,
    });

    res.status(200).json({
      success: true,
      message:
        "Order succesfully received. It will be processed within next 24 hours",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// send email to admin when creator logs in => /api/v1/creator/log
exports.creatorLog = catchAsyncErrors(async (req, res, next) => {
  const { creator } = req.body;

  try {
    await sendMail({
      email: `samuelndewa2018@gmail.com`,
      subject: `Creator Logged In`,
      message: `Creator ${creator} logged in to the website`,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
