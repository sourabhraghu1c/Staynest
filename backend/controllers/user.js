const User = require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


// module.exports.userLogout = (req, res, next) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     //res.clearCookie("connect.sid"); // Clears the session cookie (for session-based auth)
//     console.log("logout with react");
//     res.status(200).json({ message: "Logout successful" }); // Send JSON response
//   });
// };

//react with jwt signin and login
module.exports.userSignIn = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user= await User.findOne({username});
    if(user){
      return res.status(409).json({message:"User is already exist, you can login",success:false});
    }

    const newUser = new User({ username, email, password });
    //know we encript the password
    newUser.password = await bcrypt.hash(password,10);
    await newUser.save();
    res.status(201).json({message:"Signup Successful",success:true});
    
  } catch (error) {
    return res.status(500).json({ success: false, message:"Internal Server error!" });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user= await User.findOne({username});
    if(!user){
      return res.status(403).json({message:"User not exist, check username",success:false});
    }
    const isPasswordMatch= await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
      return res.status(403).json({message:"wrong Password!",success:false});
    }
    const jwtToken=jwt.sign(
      {username:user.username,_id:user._id,loginUser:user},
      process.env.JWT_SECRET,
      {expiresIn:'24h'}
    );
    console.log(user);
    res.status(200).json({message:"Login Successful",success:true,jwtToken,loginUser:user});
    
  } catch (error) {
    return res.status(500).json({ success: false, message:"Internal Server error!" });
  }
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

    res.status(200).json({ success: true, message: "Profile updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Failed to update profile. Please try again." });
  }
};
