const User=require("../models/user.js");


module.exports.renderSignupForm=(req,res)=>{
    res.render("./users/signup.ejs");
}

module.exports.userSignIn=async(req,res)=>{
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
}


module.exports.renderLoginForm=(req,res)=>{
    res.render("./users/login.ejs");
}



module.exports.userLogin=async(req,res)=>{
    req.flash("success","Welcome back to Staynest!");
    let redirectUrl=res.locals.redirectUrl || "/rentals";
    res.redirect(redirectUrl);
}



module.exports.userLogout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logout now!");
        res.redirect("/rentals");
    })
}