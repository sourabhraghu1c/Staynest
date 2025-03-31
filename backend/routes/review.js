const express= require("express");

const {validateReview, isLoggedIn, isReviewAuther}=require("../Middlewares/middleware.js");
//to create router
const router=express.Router({mergeParams:true});

//controller
const reviewController=require("../controllers/review.js");


router.post("/",isLoggedIn,validateReview,reviewController.createReview);


router.delete("/:reviewId",isLoggedIn,isReviewAuther,reviewController.destroyReview);

module.exports=router;