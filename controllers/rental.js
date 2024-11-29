const Rental =require("../models/rental.js");
const Review=require("../models/review.js");

module.exports.index=async (req, res) => {
    const allRentals = await Rental.find({});
    res.render("./rentals/index.ejs", { allRentals });
}

module.exports.renderNewForm = (req, res) => {
    res.render("./rentals/new.ejs");
}




module.exports.showRental=async (req, res) => {
    let { id } = req.params;
    const rental= await Rental.findById(id).populate( { path:"reviews",populate:{path:"author"} } ).populate("owner");
    if(!rental){
        req.flash("error","Rental not exist!");
        res.redirect("/rentals");
    }
    res.render("./rentals/show.ejs", { rental });
}



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
