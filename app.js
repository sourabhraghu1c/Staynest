const express= require("express");
const app=express();
const mongoose=require("mongoose");
const ExpressError=require("./utils/ExpressError.js");
const rentals=require("./routes/rental.js")

//for templating
const ejsMate=require("ejs-mate"); 
app.engine("ejs",ejsMate);


//to connect different folders
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//to override methods of html forms
const methodOverride=require("method-override");
app.use(methodOverride('_method'));


app.use(express.static(path.join(__dirname,"/public"))); // to use the files of public folder

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

app.get("/",(req,res)=>{
    res.send("root is working");
});



app.use("/rentals",rentals)

// Catch-all for undefined routes
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
});

// Global error handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { message });
});


