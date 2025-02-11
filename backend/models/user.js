const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
    },
    profileImage: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
    },
    phonenumber: { type: String }, // Optional
    fullname: { type: String }, // Optional
    dob: { type: Date }, // Optional
})

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",userSchema);


