const Rental =require("../models/rental.js");
const Review=require("../models/review.js");
const multer = require("multer");
const {storage}=require("../config/cloudconfig.js");
const upload = multer({ storage });



module.exports.index = async(req, res) => {
    try {
        const allRentals = await Rental.find({});
        return res.json(allRentals); 
    } catch (error) {
        console.error("Error fetching rentals:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports.showRental = async (req, res) => {
    let { id } = req.params;
    const rental = await Rental.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!rental) {
        return res.status(404).json({ error: "Rental not found!" });
    }
    return res.json(rental);  
};


module.exports.createRental = async (req, res, next) => {
    try {
        let newRental=new Rental({...req.body});
        // Handle uploaded image
        newRental.owner=req.user._id;
        if (req.file) {
            newRental.photos = {
                url: req.file.path, 
                filename: req.file.originalname,
            };
        }
        console.log(newRental);
        await newRental.save();
        console.log("rental is saved");
        return res.status(201).json({ message: "New rental created!", success:true });
    } catch (error) {
        
        return res.status(500).json({ message: "Internal Server Error" ,success:false });
    }
};


module.exports.editRental=async (req, res) => {
    let { id } = req.params;
    const rental = await Rental.findById(id);
    if(!rental){
        res.status(400).json({message:"Error in  updation!",success:false});
    }
    return res.json(rental);
}

module.exports.updateRental = async (req, res) => {
    try {
        let { id } = req.params;
        let rental = await Rental.findById(id);
        if (!rental) {
            return res.status(400).json({ message: "Rental not found!", success: false });
        }

        // Extract the update data while preserving photos
        let updateData = { ...req.body };

        // If no new photo is uploaded, preserve the existing photo
        if (!req.file) {
            updateData.photos = rental.photos;
        } else {
            updateData.photos = {
                url: req.file.path,
                filename: req.file.filename
            };
        }

        // Update the rental
        await Rental.findByIdAndUpdate(id, updateData, { new: true });

        return res.status(200).json({ message: "Rental updated successfully!", success: true });

    } catch (err) {
        console.error("Update error:", err);
        return res.status(500).json({ message: "Error updating rental!", success: false });
    }
};

module.exports.destroyRental = async (req, res) => {
    try {
        const rental = await Rental.findById(req.params.id);
        
        if (!rental) {
            return res.status(404).json({ error: "Rental not found" });
        }

        // Delete associated reviews
        await Review.deleteMany({ _id: { $in: rental.reviews } });

        // Delete the rental
        await Rental.findByIdAndDelete(req.params.id);

        res.status(200).json({ message: "Successfully deleted rental" });
    } catch (error) {
        console.error("Error deleting rental:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.searchRentals = async (req, res) => {
    const { address, price_range, property_type } = req.query;
    console.log("request reach to search with this data;-",req.query)
    
    try {
        const query = {};

        if (address) {
            query["location.address"] = { $regex: address, $options: "i" };
        }

        if (price_range) {
            const [min, max] = price_range.split("-").map(Number);
            if (!isNaN(min)) {
                query.price = { $gte: min };
                if (!isNaN(max)) {
                    query.price.$lte = max;
                }
            } else {
                console.warn("Invalid price range format:", price_range);
            }
        }

        if (property_type) {
            query.propertyType = property_type;
        }

        const allRentals = await Rental.find(query);

        // Send JSON response instead of rendering EJS
        res.json({ rentals: allRentals });
    } catch (error) {
        console.error("Error fetching rentals:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


