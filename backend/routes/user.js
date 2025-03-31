const express = require("express");
const router = express.Router();

const { isLoggedIn,signupValidation,loginValidation } = require("../Middlewares/middleware.js");
const userController = require("../controllers/user.js");

const multer = require("multer");
const { userProfileStorage } = require("../config/cloudconfig.js");

// Multer storage configuration for handling profile image uploads
const uploadUserProfile = multer({ storage: userProfileStorage }); // Corrected multer storage configuration

router
  .route("/signup")
  .post(signupValidation,userController.userSignIn);


router
  .route("/login")
  .post(loginValidation,userController.userLogin);

router
  .route("/profile-settings")
  .post(
    isLoggedIn,
    uploadUserProfile.single("profileImage"), // Handles profile image upload
  userController.updateProfileSettings // Calls the controller to update the profile
  );

// Logout route
// router.get("/logout", userController.userLogout);

module.exports = router;
