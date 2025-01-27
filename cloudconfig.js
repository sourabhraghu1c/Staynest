const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,  //by default names
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
    folder:"Staynest_DEV",
    allowed_formats:["png","jpg","jpeg"],
    },
});

// Custom storage for user profile images
const userProfileStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Staynest_DEV/UserProfile",
        allowed_formats: ["png", "jpg", "jpeg"],
    },
});


module.exports={
    cloudinary,
    storage,
    userProfileStorage,
}