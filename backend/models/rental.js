const mongoose=require("mongoose");


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
    
    ownerDetails: {
        name: {
            type: String,
            required: function () {
                return this.addedByHomeseeker === true;
            },
        },
        phone: {
            type: String,
            required: function () {
                return this.addedByHomeseeker === true;
            },
        },
        email: {
            type: String,
        },
    },

    addedByHomeseeker: {
        type: Boolean,
        default: false,
    },

    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Review"
        },
    ],
    postedBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
    },
});


const Rental = mongoose.model("Rental",rentalSchema);
module.exports=Rental;
