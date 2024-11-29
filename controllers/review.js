const Review=require("../models/review.js");
const Rental =require("../models/rental.js");




module.exports.createReview=async(req,res)=>{
    let rental= await Rental.findById(req.params.id);
    let newReview= new Review(req.body.review);
    newReview.author=req.user._id;
    rental.reviews.push(newReview);
    await newReview.save();
    await rental.save();
    res.redirect(`/rentals/${rental._id}`);
}



module.exports.destroyReview=async(req,res)=>{
    let { id, reviewId } = req.params;
    await Rental.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/rentals/${id}`);
}