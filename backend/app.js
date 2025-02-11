if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

const express= require("express");
const app=express();
const mongoose=require("mongoose");
const ExpressError=require("./utils/ExpressError.js");
const rentalRouter=require("./routes/rental.js")
const userRouter=require("./routes/user.js");
const reviewRouter=require("./routes/review.js");
const session=require("express-session");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy = require('passport-local').Strategy;
const User=require("./models/user.js");

//for templating
const ejsMate=require("ejs-mate"); 
app.engine("ejs",ejsMate);


//to connect different folders
const path=require("path");
app.set("view engine","ejs");
app.set('views', path.join(__dirname, '../frontend/views'));

//to override methods of html forms
const methodOverride=require("method-override");
app.use(methodOverride('_method'));


app.use(express.static(path.join(__dirname, '../frontend/public')));  // to use the files of public folder

//to parse the data from request
app.use(express.urlencoded({extended:true}));

const port=8080;
const MONGO_URL="mongodb://127.0.0.1:27017/Staynest_db";
main().then(()=>{
    console.log("connected to database"); 
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
}
app.listen(port,()=>{
    console.log("server connected");
});

const sessionOptions={
    secret:"supersecretcode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,  //session expire in 7 days
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

// we use passport here to make sure that is also use sessions
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
});

app.use("/rentals",rentalRouter);
app.use("/rentals/:id/reviews",reviewRouter);
app.use("/",userRouter);




// Catch-all for undefined routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// Global error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});


