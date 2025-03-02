const User = require("../models/user");



module.exports.renderSignupForm = (req, res) => {
  res.render("./users/signup.ejs");
};

// module.exports.userSignIn = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const newUser = new User({ username, email, password });
//     const registeredUser = await User.register(newUser, password);
//     req.login(registeredUser, (err) => {
//       if (err) {
//         return next(err);
//       }
//       req.flash("success", "Welcome to Staynest!");
//       res.redirect("/rentals");
//     });
//   } catch (e) {
//     req.flash("error", e.message);
//     res.redirect("/signup");
//   }
// };

module.exports.userSignIn = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    
    // Register user with Passport
    const registeredUser = await User.register(newUser, password);

    req.logIn(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ success: true, message: "User registered successfully!", redirectUrl: "/" });
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};



module.exports.renderLoginForm = (req, res) => {
  res.render("./users/login.ejs");
};

// module.exports.userLogin = async (req, res) => {
//   console.log("login from Ejs");
//   req.flash("success", "Welcome back to Staynest!");
//   let redirectUrl = res.locals.redirectUrl || "/rentals";
//   res.redirect(redirectUrl);
  
// };

module.exports.userLogin = async (req, res) => {
  try {
    console.log("Login from React frontend");

    // let redirectUrl = res.locals.redirectUrl || "/"; // Adjusted redirect URL
    let redirectUrl ="http://localhost:5000"; // Adjusted redirect URL

    res.json(redirectUrl); // Return full URL
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// module.exports.userLogout = (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     req.flash("success", "You are logged out now!");
//     res.redirect("/rentals");
//   });
// };

module.exports.userLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    //res.clearCookie("connect.sid"); // Clears the session cookie (for session-based auth)
    console.log("logout with react");
    res.status(200).json({ message: "Logout successful" }); // Send JSON response
  });
};

module.exports.renderProfileSettingsForm = (req, res) => {
  res.render("./users/profileSettings.ejs", { user: req.user });
};

module.exports.updateProfileSettings = async (req, res) => {
  try {
    const { fullname, phonenumber, dob } = req.body;
    let profileImage = req.user.profileImage; // Default to current image

    // Check if a new file is uploaded
    if (req.file) {
      profileImage = req.file.path; // Use the uploaded image's file path
    }

    // Update user in the database with new profile data
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { fullname, phonenumber, dob, profileImage },
      { new: true, runValidators: true }
    );

    req.flash("success", "Profile updated successfully!");
    res.redirect("/rentals");
  } catch (error) {
    req.flash("error", "Failed to update profile. Please try again.");
    res.redirect("/rentals");
  }
};

