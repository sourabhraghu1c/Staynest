const Rental =require("../models/rental.js");
const Review =require("../models/review.js");
const {reviewSchema, userLoginSchema,userSignupSchema,rentalSchema}=require("../validations/schema.js")
const jwt=require('jsonwebtoken');

module.exports.validateRental = (req, res, next) => {
    try {
        if (typeof req.body.location === "string") {
            req.body.location = JSON.parse(req.body.location);
        }
        if (typeof req.body.contact === "string") {
            req.body.contact = JSON.parse(req.body.contact);
        }
        if (typeof req.body.ownerDetails === "string") {
            req.body.ownerDetails = JSON.parse(req.body.ownerDetails);
        }
        if (typeof req.body.addedByHomeseeker === "string") {
            req.body.addedByHomeseeker = req.body.addedByHomeseeker === "true";
        }
    } catch (error) {
        return res.status(400).json({  message: "Invalid JSON format", success: false });
    }
    const { error } = rentalSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details.map((el) => el.message).join(","), success: false });
    }
    next();
};

module.exports.validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body);
    if (error){
        return res.status(400).json({ message: error.details.map((el) => el.message).join(","), success: false });
    }
    next();
}

module.exports.isReviewAuther= async(req,res,next)=>{
    let { id,reviewId } = req.params;
    let review= await Review.findById(reviewId);
    if((req.user.role=="admin")||(review.author._id.equals(req.user._id))){
        return next();
    }
        return res.status(401).json({message:"You are not the Author of this Review!",success:false});
}

module.exports.signupValidation=(req,res,next)=>{
    const {error}=userSignupSchema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error});
    }
    return next();
}

module.exports.loginValidation=(req,res,next)=>{
    const {error}=userLoginSchema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Bad request",error});
    }
    return next();
}

module.exports.isLoggedIn=(req,res,next)=>{
    const auth=req.headers['authorization'];
    if(!auth){
        return res.status(401).json({message:"Unauthorized, please login first",success:false});
    }
    try{
        const decoded=jwt.verify(auth,process.env.JWT_SECRET);
        req.user=decoded.loginUser;
        return next();
    }catch(err){
        return res.status(401).json({message:"Unauthorized,session expires please login again",success:false});
    }
}

module.exports.isOwner= async(req,res,next)=>{
    let { id } = req.params;
    let rental= await Rental.findById(id);
    if(req.user.role==="admin" || rental.postedBy._id.equals(req.user._id) ){
        return next();
    }
    return res.status(401).json({message:"You are not the Lister of this Rental!",success:false});
}