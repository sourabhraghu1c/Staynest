const express= require("express");
const router=express.Router();
const partnerRentalController=require("../controllers/partnerRental.js");

const {isLoggedIn, isOwner,validateRental}=require("../Middlewares/middleware.js");

const multer  = require('multer')
const {storage}=require("../config/cloudconfig.js");
const upload = multer({storage});


router
  .route("/")
  .get(isLoggedIn,partnerRentalController.AllPartnerRentals)
  .post(
    isLoggedIn,             
    upload.single("photos"), 
    validateRental,         
    partnerRentalController.createPartnerRental
  );


router
  .route("/:id")
  .get(isLoggedIn,partnerRentalController.showPartnerRental) 
  .delete(isLoggedIn,isOwner,partnerRentalController.destroyPartnerRental);


module.exports=router;