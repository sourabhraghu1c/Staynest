const express= require("express");
const app=express();
const mongoose=require("mongoose");
const Rental =require("./models/rental");

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

// this is index route
app.get("/rentals",async(req,res)=>{
    const allRentals = await Rental.find({});
    res.render("./rentals/index.ejs",{allRentals});
});

//this is new route
//make sure to make it above /rentals/:id because it create error and take /new as id
app.get("/rentals/new",(req,res)=>{
    res.render("./rentals/new.ejs");
})


//this is show route
app.get("/rentals/:id",async(req,res)=>{
    let {id}=req.params;
    const rental= await Rental.findById(id);
    res.render("./rentals/show.ejs",{rental});
});

//this is create route
app.post("/rentals",async(req,res)=>{
    let newRental=new Rental(req.body.rental);
    await newRental.save();
    console.log("Rental saved");
    res.redirect("/rentals")
    });

// this is edit route
app.get("/rentals/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const rental= await Rental.findById(id);
    res.render("./rentals/edit.ejs",{rental});
});

// this is update route
app.put("/rentals/:id",async(req,res)=>{
    let {id}=req.params;
    await Rental.findByIdAndUpdate(
        id,
        {...req.body.rental},
    )
    res.redirect(`/rentals/${id}`);
});

//delete route
app.delete("/rentals/:id",async(req,res)=>{
    let {id}=req.params;
    await Rental.findByIdAndDelete(id);
    res.redirect("/rentals");
});


