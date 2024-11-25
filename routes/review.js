const express= require("express");
const Rental =require("../models/rental.js");
const Review=require("../models/review.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {reviewSchema}=require("../schema.js")
const {validateReview, isLoggedIn, isReviewAuther}=require("../middleware.js");
//to create router
const router=express.Router({mergeParams:true});


// reviews route
router.post("/",isLoggedIn,validateReview,wrapAsync(async(req,res)=>{
    let rental= await Rental.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author=req.user._id;
    rental.reviews.push(newReview);
    await newReview.save();
    await rental.save();
    res.redirect(`/rentals/${rental._id}`);
}));

router.delete("/:reviewId",isReviewAuther,isLoggedIn,wrapAsync(async(req,res)=>{
    let { id, reviewId } = req.params;
    await Rental.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/rentals/${id}`);
}))

module.exports=router;