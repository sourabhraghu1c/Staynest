const Rental =require("../models/rental.js");
const Review=require("../models/review.js");

// module.exports.index=async (req, res) => {
//     const allRentals = await Rental.find({});
//     res.render("./rentals/index.ejs", { allRentals });
// }

module.exports.index = async(req, res) => {
    try {
        const allRentals = await Rental.find({});
        res.json(allRentals); // Send JSON response for React frontend
    } catch (error) {
        console.error("Error fetching rentals:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.renderNewForm = (req, res) => {
    res.render("./rentals/new.ejs");
}




// module.exports.showRental=async (req, res) => {
//     let { id } = req.params;
//     const rental= await Rental.findById(id).populate( { path:"reviews",populate:{path:"author"} } ).populate("owner");
//     if(!rental){
//         req.flash("error","Rental not exist!");
//         res.redirect("/rentals");
//     }
//     res.render("./rentals/show.ejs", { rental });
// }

module.exports.showRental = async (req, res) => {
    let { id } = req.params;
    const rental = await Rental.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!rental) {
        return res.status(404).json({ error: "Rental not found!" });
    }
    res.json(rental);  // Send JSON instead of rendering EJS
};



module.exports.createRental=async (req, res, next) => {
    let newRental = new Rental(req.body.rental);
    newRental.owner=req.user._id;
    if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        newRental.photos={url,filename};
    }
    await newRental.save();
    req.flash("success","New rental created!");
    res.redirect("/rentals");
}


module.exports.editRental=async (req, res) => {
    let { id } = req.params;
    const rental = await Rental.findById(id);
    if(!rental){
        req.flash("error","Rental not exist!");
        res.redirect("/rentals");
    }
    res.render("./rentals/edit.ejs", { rental });
}


module.exports.updateRental=async (req, res) => {
    let { id } = req.params;
    let rental=await Rental.findByIdAndUpdate(id, { ...req.body.rental });
    if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename; 
        rental.photos={url,filename};
        await rental.save();
    }
    res.redirect(`/rentals/${id}`);
}


module.exports.destroyRental=async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (rental) {
        await Review.deleteMany({ _id: { $in: rental.reviews } }); // Delete associated reviews
        await Rental.findByIdAndDelete(req.params.id); // Delete rental
    }
    req.flash("success", "Successfully deleted rental");
    res.redirect("/rentals");
}

module.exports.searchRentals=async (req, res) => {
    const { address, price_range, property_type } = req.query;
    try {
    // Initialize a query object
        const query = {};
    // Add filters based on the search inputs
        if (address) {
            query["location.address"] = { $regex: address, $options: "i" }; // Case-insensitive regex search
        }
        if (price_range) {
            const [min, max] = price_range.split("-").map(Number);
        if (!isNaN(min)) {
            query.price = { $gte: min }; // Minimum price
            if (!isNaN(max)) {
              query.price.$lte = max; // Maximum price if it exists
            }
        } else {
            console.warn("Invalid price range format:", price_range);
        }
        }
        if (property_type) {
            query.propertyType = property_type;
        }
        // Fetch rentals matching the query
        const allRentals = await Rental.find(query);
        // Render the results in the `index.ejs` template
        res.render("./rentals/index.ejs", { allRentals });
    } catch (error) {
        console.error("Error fetching rentals:", error);
        res.status(500).send("Internal Server Error");
    }
}
