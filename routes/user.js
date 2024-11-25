const express= require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync=require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");


router.get("/signup",(req,res)=>{
    res.render("./users/signup.ejs");
});

router.post("/signup",wrapAsync(async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        const newUser= new User({username,email,password});
        const registeredUser= await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","welcome to Staynest!");
            res.redirect("/rentals");
        });
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}));

router.get("/login",(req,res)=>{
    res.render("./users/login.ejs");
});

router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),
    async(req,res)=>{
        req.flash("success","Welcome back to Staynest!");
        let redirectUrl=res.locals.redirectUrl || "/rentals";
        res.redirect(redirectUrl);
    }
);

router.get(
    "/logout",
    (req,res,next)=>{
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","you are logout now!");
            res.redirect("/rentals");
        })
    }
)

module.exports=router;