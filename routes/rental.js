const express= require("express");
const Rental =require("../models/rental.js");
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {rentalSchema}=require("../schema.js")
//to create router
const router=express.Router();




const validateRental=(req,res,next)=>{
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

// this is index route
router.get("/", wrapAsync(async (req, res) => {
    const allRentals = await Rental.find({});
    res.render("./rentals/index.ejs", { allRentals });
}));


// this is new route
router.get("/new", (req, res) => {
    res.render("./rentals/new.ejs");
});

// this is show route
router.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const rental = await Rental.findById(id);
    res.render("./rentals/show.ejs", { rental });
}));


// this is create route
router.post("/",validateRental,wrapAsync(async (req, res, next) => {
    let newRental = new Rental(req.body.rental);
    await newRental.save();
    res.redirect("/rentals");
}));


// this is edit route
router.get("/:id/edit", wrapAsync(async (req, res) => {
    let { id } = req.params;
    const rental = await Rental.findById(id);
    res.render("./rentals/edit.ejs", { rental });
}));


// this is update route
router.put("/:id",validateRental, wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Rental.findByIdAndUpdate(id, { ...req.body.rental });
    res.redirect(`/rentals/${id}`);
}));


// delete route
router.delete("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Rental.findByIdAndDelete(id);
    res.redirect("/rentals");
}));


module.exports=router;