const Rental =require("./models/rental.js");
const Review =require("./models/review.js");
const ExpressError=require("./utils/ExpressError.js");
const {rentalSchema,reviewSchema}=require("./schema.js")


module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","you must logged in to Modify Rentals!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner= async(req,res,next)=>{
    let { id } = req.params;
    let rental= await Rental.findById(id);
    if(!rental.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not the owner of the Rental!");
        return res.redirect(`/rentals/${id}`);
    }
    next();
}

module.exports.validateRental=(req,res,next)=>{
    const {error}=rentalSchema.validate(req.body); //to check validitions using joi package
    if (error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        console.log(errMsg);
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}

module.exports.validateReview=(req,res,next)=>{
    const {error}=reviewSchema.validate(req.body); //to check validitions using joi package
    if (error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        console.log(errMsg);
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
}


module.exports.isReviewAuther= async(req,res,next)=>{
    let { id,reviewId } = req.params;
    let review= await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash("error","you are not the author of the Review!");
        return res.redirect(`/rentals/${id}`);
    }
    next();
}