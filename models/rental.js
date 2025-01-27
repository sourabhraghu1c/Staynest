//const { ref } = require('joi');
const mongoose=require("mongoose");
const schema=mongoose.Schema;
const User=require("./user.js");

const rentalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: {
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        address: { type: String, required: true },
        
    },
    price: { type: Number, required: true },
    propertyType: { type: String, required: true },
    facilities: { type: String },
    photos: { 
        url: { type: String, required: true }, 
        filename:{ type: String, required: true },
    },
    contact: {
        name: { type: String, required: true },
        phone: { type: String,
            required: true,
        },
        email: { type: String }
    },
    reviews:[
        {
            type: schema.Types.ObjectId,
            ref:"Review"
        },
    ],
    owner:{
            type: schema.Types.ObjectId,
            ref:"User",
    },
});

// module.exports = mongoose.model('Rental', rentalSchema);

const Rental = mongoose.model("Rental",rentalSchema);
module.exports=Rental;
