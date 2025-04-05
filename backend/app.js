//very important
if(process.env.NODE_ENV !="production"){
    require("dotenv").config();
}

const cors = require("cors");
const bodyParser=require("body-parser");
const express= require("express");
const app=express();
const mongoose=require("mongoose");
const rentalRouter=require("./routes/rental.js")
const userRouter=require("./routes/user.js");
const reviewRouter=require("./routes/review.js");

app.use(bodyParser.json());


app.use(cors({
    origin:`http://localhost:${process.env.FRONTEND_PORT || 3001}`,  // Allow requests from React frontend
    credentials: true,  // Necessary for cookies/sessions
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization" // Explicitly allow headers
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
app.listen(port,()=>{
    console.log("server connected on port ",port);
});


app.use("/rentals",rentalRouter);
app.use("/rentals/:id/reviews",reviewRouter);
app.use("/",userRouter);

app.all("*", (req, res, next) => {
    res.status(404).json({message:"page not found",success:false});
});


