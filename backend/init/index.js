const mongoose= require("mongoose");
const initdata= require("./data.js");
const Rental=require("../models/rental.js");

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

const initDB=async ()=>{
    await Rental.deleteMany({});
    initdata.data=initdata.data.map((obj)=>({...obj,postedBy:"681471e932f814108dbf1f0b"}));
    await Rental.insertMany(initdata.data);
    console.log("data was initialised");
}
initDB();