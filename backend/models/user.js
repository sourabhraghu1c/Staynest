const mongoose = require("mongoose");
const Schema=mongoose.Schema;

const userSchema= new Schema({
    username :{
        type:String,
        required:true,
        unique:true,
    },
    email :{
        type:String,
        required:true,
    },
    password :{
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
});

module.exports =mongoose.model('User',userSchema);;
