import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddRental.css";
import { handleError, handleSuccess } from "../utils";

export default function AddRental() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            location: { address: "", state: "", pincode: "" },
            contact: { name: "", phone: "", email: "" },
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
        
        // Append nested objects (location & contact) as JSON strings
        formData.append("location", JSON.stringify(data.location));
        formData.append("contact", JSON.stringify(data.contact));

        // ✅ Append the image (only if a file is selected)
        if (data.photos?.length > 0) {
            formData.append("photos", data.photos[0]); // Single file upload
        }

        // ✅ Send everything in a single request
        console.log("this is addRental log",token);
        const response = await axios.post(`https://staynest-l88z.onrender.com/rentals`, formData, {
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
        navigate("/");
    } catch (error) {
        handleError(error.message || "Something went wrong");
    }
};




    return (
        <div className="add-rental-container">
            <h3>Add New Rental</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className="form-label">Title:</label>
                    <input type="text" {...register("title", { required: "Please enter a title" })} className="form-control" placeholder="Enter the title" />
                    {errors.title && <span className="error-text">{errors.title.message}</span>}
                </div>

                <div>
                    <label className="form-label">Description:</label>
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

                {/* Contact Details */}
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
                    <label className="form-label">Contact Email:</label>
                    <input type="email" {...register("contact.email")} className="form-control" placeholder="Enter email (optional)" />
                </div>

                <button className="add-btn" type="submit" disabled={isSubmitting}>Add Rental</button>
            </form>
        </div>
    );
}

