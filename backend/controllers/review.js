const Review=require("../models/review.js");
const Rental =require("../models/rental.js");

module.exports.createReview = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);
        if (!rental) {
            return res.status(404).json({ error: "Rental not found" });
        }

        const newReview = new Review(req.body.review);
        newReview.author = req.user._id; 

        rental.reviews.push(newReview);
        await newReview.save();
        await rental.save();

        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        console.error("Error creating review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports.destroyReview=async(req,res)=>{
    try{
    let { id, reviewId } = req.params;
    await Rental.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: "Successfully deleted rental" });
    }
    catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}