// const express= require("express");
// const router=express.Router();
// const wrapAsync=require("../utils/wrapAsync.js");
// const passport=require("passport");
// const {isLoggedIn,saveRedirectUrl}=require("../middleware.js");
// const userController=require("../controllers/user.js");

// const multer = require("multer");
// const { userProfileStorage } = require("../cloudconfig.js");




// router
// .route("/signup")
// .get(userController.renderSignupForm)
// .post(wrapAsync(userController.userSignIn));


// router
// .route("/login")
// .get(userController.renderLoginForm)
// .post(
//     saveRedirectUrl,
//     passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
//     wrapAsync(userController.userLogin)
// );

// // const uploadUserProfile = multer({userProfileStorage});
// const uploadUserProfile = multer({ storage: userProfileStorage }); // Corrected multer storage configuration

// router
//     .route("/profile-settings")
//     .get(isLoggedIn, userController.renderProfileSettingsForm)
//     .post(
//         isLoggedIn,
//         uploadUserProfile.single("profileImage"),
//         wrapAsync(userController.updateProfileSettings)
//     );

// //logout
// router.get(
//     "/logout",
//     userController.userLogout
// );

// module.exports=router;




const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { isLoggedIn, saveRedirectUrl } = require("../Middlewares/middleware.js");
const userController = require("../controllers/user.js");

const multer = require("multer");
const { userProfileStorage } = require("../config/cloudconfig.js");

// Multer storage configuration for handling profile image uploads
const uploadUserProfile = multer({ storage: userProfileStorage }); // Corrected multer storage configuration

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.userSignIn));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    wrapAsync(userController.userLogin)
  );

// Profile settings route
router
  .route("/profile-settings")
  .get(isLoggedIn, userController.renderProfileSettingsForm)
  .post(
    isLoggedIn,
    uploadUserProfile.single("profileImage"), // Handles profile image upload
    wrapAsync(userController.updateProfileSettings) // Calls the controller to update the profile
  );

// Logout route
router.get("/logout", userController.userLogout);

module.exports = router;
