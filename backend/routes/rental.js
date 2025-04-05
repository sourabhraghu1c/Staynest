const express= require("express");
//to create router
const router=express.Router();
//controllers
const rentalController=require("../controllers/rental.js");
//middleware

const {isLoggedIn, isOwner,validateRental}=require("../Middlewares/middleware.js");

//multer files from form
const multer  = require('multer')
const {storage}=require("../config/cloudconfig.js");
const upload = multer({storage});


router
  .route("/")
  .get(rentalController.index)
  .post(
    isLoggedIn,             
    upload.single("photos"), 
    validateRental,         
    rentalController.createRental
  );

router.get("/search",rentalController.searchRentals);

router //this rout must below the /new as it take new also as a id
.route("/:id")
.get(isLoggedIn,rentalController.showRental) 
.put(isLoggedIn,isOwner,upload.single("photos"),validateRental,rentalController.updateRental)
.delete(isLoggedIn,isOwner,rentalController.destroyRental);


module.exports=router;