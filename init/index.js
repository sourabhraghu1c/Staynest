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
    // to add owner to every rental
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"6742a91074514dec757e1028"}));
    await Rental.insertMany(initdata.data);
    console.log("data was initialised");
}
initDB();