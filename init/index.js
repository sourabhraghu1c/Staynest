const mongoose= require("mongoose");
const initdata= require("./data.js");
const Rental=require("../models/rental.js");

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

const initDB=async ()=>{
    await Rental.deleteMany({});
    await Rental.insertMany(initdata.data);
    console.log("data was initialised");
}
initDB();