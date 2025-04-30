const mongoose= require("mongoose");
const initdata= require("./data.js");
const Rental=require("../models/rental.js");

const mongoUrl="mongodb://127.0.0.1:27017/Staynest_db";
main().then(()=>{
    //console.log("connected to database"); 
})
.catch((err)=>{
    //console.log(err); 
});

async function main(){
    await mongoose.connect(mongoUrl);
}

const initDB=async ()=>{
    await Rental.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,postedBy:"67f0b2ff03e140786a239fa5"}));
    await Rental.insertMany(initdata.data);
    //console.log("data was initialised");
}
initDB();