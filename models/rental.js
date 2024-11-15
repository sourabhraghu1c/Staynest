const mongoose = require('mongoose');

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
    photos: { type: String,required: true },
    contact: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String }
    }
});

module.exports = mongoose.model('Rental', rentalSchema);

