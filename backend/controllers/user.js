const User = require("../models/user");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

module.exports.userSignIn = async (req, res) => {
  try {
    const { username, email, password,role,phonenumber } = req.body;
    const user= await User.findOne({username});
    if(user){
      return res.status(409).json({message:"User is already exist, you can login",success:false});
    }
    const newUser = new User({ username, email, password, role, phonenumber });
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
    res.status(200).json({message:"Login Successful",success:true,jwtToken,loginUser:user});
    
  } catch (error) {
    return res.status(500).json({ success: false, message:"Internal Server error!" });
  }
};


module.exports.updateProfileSettings = async (req, res) => {
  try {
    const {phonenumber,email, currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let profileImage = user.profileImage; 

    if (req.file) {
      profileImage = req.file.path;
    }

    const isProfileModified = (
      phonenumber !== user.phonenumber ||
      email !== user.email ||
      profileImage !== user.profileImage
    );

    if (isProfileModified || newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ success: false, message: "Current password is required to update profile." });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Current password is incorrect" });
      }

      if (newPassword) {
        if(newPassword==currentPassword){
          return res.status(400).json({ success: false, message: "New password must be different from current password!" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
      }
    }

    user.phonenumber = phonenumber || user.phonenumber;
    user.email = email || user.email;
    user.profileImage = profileImage;

    await user.save();

    res.status(200).json({ success: true, message: "Profile updated successfully!", user });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Failed to update profile. Please try again." });
  }
};
