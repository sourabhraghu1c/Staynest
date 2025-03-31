const Rental =require("../models/rental.js");
const Review =require("../models/review.js");
const {reviewSchema, userLoginSchema,userSignupSchema,rentalSchema}=require("../validations/schema.js")
const jwt=require('jsonwebtoken');
const Joi = require("joi");


// module.exports.saveRedirectUrl=(req,res,next)=>{
//     if(req.session.redirectUrl){
//         res.locals.redirectUrl=req.session.redirectUrl;
//     }
//     next();
// }



// const rentalSchema = Joi.object({
//     title: Joi.string().required(),
//     description: Joi.string().required(),
//     location: Joi.object({
//         state: Joi.string().required(),
//         pincode: Joi.string().pattern(/^\d{6}$/).required(),
//         address: Joi.string().required(),
//     }).required(),
//     price: Joi.number().required().min(0),
//     propertyType: Joi.string().required(),
//     facilities: Joi.string().allow("").optional(),
//     photos: Joi.any().optional(), // ✅ Accept file upload without strict validation
//     contact: Joi.object({
//         name: Joi.string().required(),
//         phone: Joi.string().pattern(/^\d{10}$/).required(),
//         email: Joi.string().email().allow("").optional(),
//     }).required(),
// }).required();

module.exports.validateRental = (req, res, next) => {
    console.log("Reach validation");

    console.log("req-body=",req.body);
    
    try {
        // ✅ Convert JSON strings (location, contact) to objects
        if (typeof req.body.location === "string") {
            req.body.location = JSON.parse(req.body.location);
        }
        if (typeof req.body.contact === "string") {
            req.body.contact = JSON.parse(req.body.contact);
        }
    } catch (error) {
        console.log("error is:",error);
        return res.status(400).json({  message: "Invalid JSON format", success: false });
    }

    // ✅ Validate the request body
    const { error } = rentalSchema.validate(req.body);
    
    if (error) {
        console.log("Validation error:", error.details);
        return res.status(400).json({ message: error.details.map((el) => el.message).join(","), success: false });
    }
    console.log("Validation success");
    next();
};

module.exports.validateReview=(req,res,next)=>{
    console.log("req-bdy:",req.body);
    const {error}=reviewSchema.validate(req.body); //to check validitions using joi package
    if (error){
        console.log("Validation error:", error.details);
        return res.status(400).json({ message: error.details.map((el) => el.message).join(","), success: false });
    }
    console.log("Validation success");
    next();
}

module.exports.isReviewAuther= async(req,res,next)=>{
    let { id,reviewId } = req.params;
    let review= await Review.findById(reviewId);
    if(!review.author._id.equals(req.user._id)){
        return res.status(401).json({message:"You are not the Author of this Review!",success:false});
    }
    next();
}






//user validation for signup
module.exports.signupValidation=(req,res,next)=>{
    const {error}=userSignupSchema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error});
    }
    next();
}

module.exports.loginValidation=(req,res,next)=>{
    const {error}=userLoginSchema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error});
    }
    next();
}

//login or not with jwt

module.exports.isLoggedIn=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(401).json({message:"Unauthorized, please login first",success:false});
    }
    //now if tocken is there so check it with secretcode
    try{
        const decoded=jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decoded; //to use the user data without database call
        console.log("auth success");
        next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized,session expires please login again",success:false});
    }
}

module.exports.isOwner= async(req,res,next)=>{
    let { id } = req.params;
    let rental= await Rental.findById(id);
    if(!rental.owner._id.equals(req.user._id)){
        return res.status(401).json({message:"You are not the owner of this Rental!",success:false});
    }
    console.log("isowner done");
    next();
}