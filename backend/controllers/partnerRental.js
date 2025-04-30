const Rental =require("../models/rental.js");
const Review=require("../models/review.js");
const multer = require("multer");
const {storage}=require("../config/cloudconfig.js");

module.exports.AllPartnerRentals = async (req, res) => {
        try {
            const allRentals = await Rental.find({ addedByHomeseeker: true });
            return res.json(allRentals); 
        } catch (error) {
            console.error("Error fetching rentals:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

module.exports.showPartnerRental = async (req, res) => {
    let { id } = req.params;
    const rental = await Rental.findById(id).populate("postedBy");
    if (!rental) {
        return res.status(404).json({ error: "Rental not found!" });
    }
    return res.json(rental);  
};


module.exports.createPartnerRental = async (req, res) => {
    try {
        let newRental=new Rental({...req.body});
        newRental.postedBy=req.user._id;
        if (req.file) {
            newRental.photos = {
                url: req.file.path, 
                filename: req.file.originalname,
            };
        }
        await newRental.save();
        return res.status(201).json({ message: "New rental created!", success:true });
    } catch (error) {
        
        return res.status(500).json({ message: "Internal Server Error" ,success:false });
    }
};


module.exports.destroyPartnerRental = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);
        
        if (!rental) {
            return res.status(404).json({ error: "Rental not found" });
        }
        // await Review.deleteMany({ _id: { $in: rental.reviews } });
        await Rental.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Successfully deleted rental" });
    } catch (error) {
        console.error("Error deleting rental:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
