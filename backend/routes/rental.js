const express= require("express");
const Rental =require("../models/rental.js");
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../models/review.js");
const ExpressError=require("../utils/ExpressError.js");
// const {rentalSchema}=require("../schema.js");
const {rentalSchema}=require("../validations/schema.js");
//to create router
const router=express.Router();
//controllers
const rentalController=require("../controllers/rental.js");
//middleware
// const {isLoggedIn, isOwner,validateRental}=require("../middleware.js");
const {isLoggedIn, isOwner,validateRental}=require("../Middlewares/middleware.js");

//multer files from form
const multer  = require('multer')
const {storage}=require("../config/cloudconfig.js");
const upload = multer({storage});



// router
// .route("/")
// .get(wrapAsync(rentalController.index))
// .post(isLoggedIn,upload.single("rental[photos]"),validateRental,wrapAsync(rentalController.createRental));

//for react
router
.route("/")
.get(rentalController.index)
.post(isLoggedIn,upload.single("rental[photos]"),validateRental,wrapAsync(rentalController.createRental));
// 
// this is new route
router.get("/new",isLoggedIn,rentalController.renderNewForm);

//for search functionality
router.get("/search", wrapAsync(rentalController.searchRentals));

// router //this rout must below the /new as it take new also as a id
// .route("/:id")
// .get(isLoggedIn,wrapAsync(rentalController.showRental)) 
// .put(isLoggedIn,isOwner,upload.single("rental[photos]"),validateRental, wrapAsync(rentalController.updateRental))
// .delete(isLoggedIn,isOwner,wrapAsync(rentalController.destroyRental));

router //this rout must below the /new as it take new also as a id
.route("/:id")
.get((rentalController.showRental)) 
.put(isLoggedIn,isOwner,upload.single("rental[photos]"),validateRental, wrapAsync(rentalController.updateRental))
.delete(isLoggedIn,isOwner,wrapAsync(rentalController.destroyRental));

// this is edit route
router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(rentalController.editRental));




module.exports=router;