import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddRental.css";
import { handleError, handleSuccess } from "../utils";

export default function AddRoommate() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            location: { address: "", state: "", pincode: "" },
            contact: { name: "", phone: "", email: "" },
            ownerDetails: { name: "", phone: "", email: "" },
        },
    });
    const navigate = useNavigate();
    const port = import.meta.env.VITE_BACKEND_PORT;

    const onSubmit = async (data) => {
    try {
        const token = localStorage.getItem("token");
        handleSuccess("Submitting rental details...");

        // ✅ Create a FormData object to send text & file together
        const formData = new FormData();

        // Append text data as JSON fields
        formData.append("title", data.title);
        formData.append("facilities", data.facilities);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("propertyType", data.propertyType);
        formData.append("addedByHomeseeker", data.addedByHomeseeker);
        
        // Append nested objects (location & contact) as JSON strings
        formData.append("location", JSON.stringify(data.location));
        formData.append("contact", JSON.stringify(data.contact));
        formData.append("ownerDetails", JSON.stringify(data.ownerDetails));

        // ✅ Append the image (only if a file is selected)
        if (data.photos?.length > 0) {
            formData.append("photos", data.photos[0]); // Single file upload
        }

        // ✅ Send everything in a single request
        const response = await axios.post(`https://staynest-l88z.onrender.com/rentalpartner`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": token
            },
        });

        if (!response.data.success) {
            handleError(response.data.message);
            return;
        }

        handleSuccess("Rental added successfully!");
        navigate("/Roommates");
    } catch (error) {
        handleError(error.message || "Something went wrong");
    }
};




    return (
    <>
        <h2 style={{color:"black",marginTop:"20px",textDecoration:"underline"}}>Add Roommate Listing</h2>
        <div className="add-rental-container">
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3>Rental details:</h3>
                <input type="hidden" {...register("addedByHomeseeker")} value={true} />
                <div>
                    <label className="form-label">Title:</label>
                    <input type="text" {...register("title", { required: "Please enter a title" })} className="form-control" placeholder="Enter the title" />
                    {errors.title && <span className="error-text">{errors.title.message}</span>}
                </div>

                <div>
                    <label className="form-label">Description and Requirements:</label>
                    <textarea {...register("description", { required: "Please provide a description" })} className="form-control" placeholder="Provide a description" />
                    {errors.description && <span className="error-text">{errors.description.message}</span>}
                </div>

                <div>
                    <label className="form-label">Facilities:</label>
                    <input type="text" {...register("facilities")} className="form-control" placeholder="Enter the facilities" />
                    {errors.facilities && <span className="error-text">{errors.facilities.message}</span>}
                </div>

                {/* Location Fields */}
                <div>
                    <label className="form-label">Address:</label>
                    <input type="text" {...register("location.address", { required: "Please provide an address" })} className="form-control" placeholder="Enter the full address" />
                    {errors.location?.address && <span className="error-text">{errors.location.address.message}</span>}
                </div>

                <div>
                    <label className="form-label">State:</label>
                    <input type="text" {...register("location.state", { required: "Please provide a state" })} className="form-control" placeholder="Enter the state" />
                    {errors.location?.state && <span className="error-text">{errors.location.state.message}</span>}
                </div>

                <div>
                    <label className="form-label">Pincode:</label>
                    <input type="text" {...register("location.pincode", { required: "Please provide a valid pincode", pattern: { value: /^\d{6}$/, message: "Enter a 6-digit pincode" } })} className="form-control" placeholder="Enter 6-digit pincode" />
                    {errors.location?.pincode && <span className="error-text">{errors.location.pincode.message}</span>}
                </div>

                <div>
                    <label className="form-label">Price (per month):</label>
                    <input type="text" {...register("price", { required: "Please provide a valid price", pattern: { value: /^[0-9]*\.?[0-9]+$/, message: "Enter a valid price" } })} className="form-control" placeholder="Enter price" />
                    {errors.price && <span className="error-text">{errors.price.message}</span>}
                </div>

                <div>
                    <label className="form-label">Property Type:</label>
                    <select {...register("propertyType", { required: "Please select a property type" })} className="form-select">
                        <option value="">Select property type</option>
                        <option value="Hostel">Hostel</option>
                        <option value="PG">PG</option>
                        <option value="Single Room">Single Room</option>
                        <option value="1RK">1RK</option>
                        <option value="1BHK">1BHK</option>
                        <option value="2BHK">2BHK</option>
                        <option value="3BHK">3BHK</option>
                    </select>
                    {errors.propertyType && <span className="error-text">{errors.propertyType.message}</span>}
                </div>

                <div>
                    <label className="form-label">Upload Rental Image:</label>
                    <input type="file" {...register("photos", { required: "Please upload an image" })} className="form-control" />
                    {errors.photos && <span className="error-text">{errors.photos.message}</span>}
                </div>

                <div>
                    <label className="form-label">Owner Name:</label>
                    <input type="text" {...register("ownerDetails.name", { required: "Please provide a contact name" })} className="form-control" placeholder="Enter contact name" />
                    {errors.ownerDetails?.name && <span className="error-text">{errors.ownerDetails.name.message}</span>}
                </div>

                <div>
                    <label className="form-label">Owner Contact:</label>
                    <input type="text" {...register("ownerDetails.phone", { required: "Please provide a valid phone number", pattern: { value: /^\d{10}$/, message: "Enter a 10-digit phone number" } })} className="form-control" placeholder="Enter phone number" />
                    {errors.ownerDetails?.phone && <span className="error-text">{errors.ownerDetails.phone.message}</span>}
                </div>

                <div>
                    <label className="form-label">Owner Email:</label>
                    <input
                        type="email"
                        {...register("ownerDetails.email", {
                            pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter a valid email",
                            }
                        })}
                        className="form-control" 
                        placeholder="Enter Email (optional)" 
                    />
                    {errors.ownerDetails?.email && <span className="error-text">{errors.ownerDetails.email.message}</span>}
                </div>

                {/* Contact Details of user */}
                <br /><br />
                <h3>Your details:-</h3>
                <div>
                    <label className="form-label">Contact Name:</label>
                    <input type="text" {...register("contact.name", { required: "Please provide a contact name" })} className="form-control" placeholder="Enter contact name" />
                    {errors.contact?.name && <span className="error-text">{errors.contact.name.message}</span>}
                </div>

                <div>
                    <label className="form-label">Contact Phone:</label>
                    <input type="text" {...register("contact.phone", { required: "Please provide a valid phone number", pattern: { value: /^\d{10}$/, message: "Enter a 10-digit phone number" } })} className="form-control" placeholder="Enter phone number" />
                    {errors.contact?.phone && <span className="error-text">{errors.contact.phone.message}</span>}
                </div>

                <div>
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        {...register("contact.email", {
                            pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Enter a valid email",
                            }
                        })}
                        className="form-control" 
                        placeholder="Enter Email (optional)"
                    />
                    {errors.contact?.email && <span className="error-text">{errors.contact.email.message}</span>}
                </div>

                <button className="add-btn" type="submit" disabled={isSubmitting}>Add Rental</button>
            </form>
        </div>
    </>
    );
}