//very important
if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

// for deployment
//import path from "path";
const path = require("path");

const cors = require("cors");
const bodyParser=require("body-parser");
const express= require("express");
const app=express();
const mongoose=require("mongoose");
const rentalRouter=require("./routes/rental.js")
const rentalPartnerRouter=require("./routes/partnerRental.js")
const userRouter=require("./routes/user.js");
const reviewRouter=require("./routes/review.js");

app.use(bodyParser.json());




app.use(cors({
    origin:`https://staynest-l88z.onrender.com`,
    credentials: true,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

//to parse the data from request
app.use(express.urlencoded({extended:true}));
app.use(express.json());

const port=process.env.BACKEND_PORT || 8080;
const mongoUrl=process.env.MONGO_URL;
main().then(()=>{
    console.log("connected to database"); 
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongoUrl);
}



//depment
const _dirname=path.resolve();


app.use("/rentals",rentalRouter);
app.use("/rentalpartner",rentalPartnerRouter);
app.use("/rentals/:id/reviews",reviewRouter);
app.use("/",userRouter);

// app.all("*", (req, res, next) => {
//     res.status(404).json({message:"page not found",success:false});
// });


app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});


app.listen(port,()=>{
    console.log("server connected on port ",port);
});
