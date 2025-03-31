const mongoose= require("mongoose");
const initdata= require("./data.js");
const Rental=require("../models/rental.js");

const mongoUrl="mongodb://127.0.0.1:27017/Staynest_db";
main().then(()=>{
    console.log("connected to database"); 
})
.catch((err)=>{
    console.log(err); 
});

async function main(){
    await mongoose.connect(mongoUrl);
}

const initDB=async ()=>{
    await Rental.deleteMany({});
    // to add owner to every rental
    initdata.data=initdata.data.map((obj)=>({...obj,owner:"67cc43759358e1766f7983a9"}));
    await Rental.insertMany(initdata.data);
    console.log("data was initialised");
}
initDB();