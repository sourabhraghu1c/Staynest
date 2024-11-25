const express= require("express");
const Rental =require("../models/rental.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../models/review.js");
const ExpressError=require("../utils/ExpressError.js");
const {rentalSchema}=require("../schema.js")
//to create router
const router=express.Router();



//middleware

const {isLoggedIn, isOwner,validateRental}=require("../middleware.js");



// this is index route
router.get("/", wrapAsync(async (req, res) => {
    const allRentals = await Rental.find({});
    res.render("./rentals/index.ejs", { allRentals });
}));


// this is new route
router.get("/new",isLoggedIn, (req, res) => {
    res.render("./rentals/new.ejs");
});

// this is show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const rental= await Rental.findById(id).populate( { path:"reviews",populate:{path:"author"} } ).populate("owner");
    if(!rental){
        req.flash("error","Rental not exist!");
        res.redirect("/rentals");
    }
    res.render("./rentals/show.ejs", { rental });
}));


// this is create route
router.post("/",isLoggedIn,validateRental,wrapAsync(async (req, res, next) => {
    let newRental = new Rental(req.body.rental);
    newRental.owner=req.user._id;
    await newRental.save();
    req.flash("success","New rental created!");
    res.redirect("/rentals");
}));


// this is edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(async (req, res) => {
    let { id } = req.params;
    const rental = await Rental.findById(id);
    if(!rental){
        req.flash("error","Rental not exist!");
        res.redirect("/rentals");
    }
    res.render("./rentals/edit.ejs", { rental });
}));


// this is update route
router.put("/:id",isLoggedIn,isOwner,validateRental, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Rental.findByIdAndUpdate(id, { ...req.body.rental });
    res.redirect(`/rentals/${id}`);
}));


router.delete("/:id",isLoggedIn,isOwner,wrapAsync(async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (rental) {
        await Review.deleteMany({ _id: { $in: rental.reviews } }); // Delete associated reviews
        await Rental.findByIdAndDelete(req.params.id); // Delete rental
    }
    req.flash("success", "Successfully deleted rental and associated reviews.");
    res.redirect("/rentals");
}));


module.exports=router;