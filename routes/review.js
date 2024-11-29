const express= require("express");
const wrapAsync=require("../utils/wrapAsync.js");
const {reviewSchema}=require("../schema.js")
const {validateReview, isLoggedIn, isReviewAuther}=require("../middleware.js");
//to create router
const router=express.Router({mergeParams:true});

//controller
const reviewController=require("../controllers/review.js");


// reviews route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

router.delete("/:reviewId",isReviewAuther,isLoggedIn,wrapAsync(reviewController.destroyReview))

module.exports=router;