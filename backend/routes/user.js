
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

// router
//   .route("/login")
//   .get(userController.renderLoginForm)
//   .post(
//     saveRedirectUrl,
//     passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
//     wrapAsync(userController.userLogin)
//   );



//for react

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
    (userController.userLogin)
  );











// router
//   .route("/login")
//   .get(userController.renderLoginForm).post(
//   saveRedirectUrl,
//   (req, res, next) => {
//     passport.authenticate("local", (err, user) => {
//       if (err) return next(err);
//       if (!user) {
//         console.log("wrong username and password");
//         return res.status(401).json({ error: "Invalid username or password" });
//       }
//       req.logIn(user, (err) => {
//         if (err) return next(err);
//         // Call userController.userLogin after successful login
//         userController.userLogin(req, res);
//       });
//     })(req, res, next);
//   }
// );



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
