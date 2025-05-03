import { useAuth } from "../Context/AuthContext";
import "./profileSettings.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "../utils";
import { FaPlus } from "react-icons/fa";

export default function ProfileSettings() {
    const { loggedInUser, setLoggedInUser } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue } = useForm();
    const navigate = useNavigate();
    const port = import.meta.env.VITE_BACKEND_PORT;
    const [imagePreview, setImagePreview] = useState(loggedInUser?.profileImage || "");

    useEffect(() => {
        if (loggedInUser) {
            // setValue("fullname", loggedInUser.fullname || "");
            setValue("phonenumber", loggedInUser.phonenumber || "");
            setValue("email", loggedInUser.email || "");
            // setValue("dob", loggedInUser.dob ? loggedInUser.dob.substring(0, 10) : "");
        }
    }, [loggedInUser, setValue]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
            setValue("profileImage", file);
        }
    };

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();

            // formData.append("fullname", data.fullname);
            formData.append("phonenumber", data.phonenumber);
            // formData.append("dob", data.dob);
            formData.append("currentPassword", data.currentPassword);
            formData.append("newPassword", data.newPassword);
            formData.append("email", data.email);

            if (data.profileImage) {
                formData.append("profileImage", data.profileImage);
            }

            const response = await axios.post(`http://localhost:${port}/profile-settings`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": token
                },
            });
            if (!response.data.success) {
                handleError(response.data.message);
                return;
            }
            setLoggedInUser(response.data.user);
            handleSuccess("Profile Updated");
            navigate("/");
        } catch (error) {
            handleError(error.response.data.message || "Something went wrong");
        }
    };

    return (
        <>
            <h1>Update Profile:</h1>
            <div className="Container">
                <div className="profileImageContainer">
                    <img className="profileImg" alt="User Avatar" src={imagePreview} />
                    <label className="imageUploadLabel">
                        <FaPlus className="plusIcon" />
                        <input 
                            type="file" 
                            {...register("profileImage")}
                            className="imageInput" 
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </label>
                </div>
                <form  onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className="Inp-Container" >
                        <div className="form-lable">
                            <label className="form-label">Phone number:</label>
                        </div>
                        <div className="Input">
                            <input type="text" {...register("phonenumber", {pattern: { value: /^\d{10}$/, message: "Enter a 10-digit phone number" } })} className="form-control" placeholder="Enter phone number" />
                            {errors.phonenumber && <span className="error-text">{errors.phonenumber.message}</span>}
                        </div>
                    </div>

                    <div className="Inp-Container" >
                        <div className="form-lable">
                            <label className="form-label">Email:</label>
                        </div>
                        <div className="Input">
                            <input type="email" {...register("email")} className="form-control" placeholder="Enter your Email " />
                            {errors.email && <span className="error-text">{errors.email.message}</span>}
                        </div>
                    </div>
                    <div className="Inp-Container" >
                        <div className="form-lable">
                            <label className="form-label">Change password:</label>
                        </div>
                        <div className="Input">
                            <div id="password">
                            <input  type="text" autoComplete="off" {...register("currentPassword", { required: "Please enter current password first for any modification" })} className="form-control" placeholder="Current password" />
                            <input type="text" {...register("newPassword")} className="form-control" placeholder="New password" />
                            </div>
                            {errors.currentPassword && <span className="error-text">{errors.currentPassword.message}</span>}
                        </div>
                    </div>
                    <div className="btns">
                        <button className="Update-btn" type="submit" disabled={isSubmitting}>Update</button>
                    </div>
                </form>
            </div>
        </>
    );
}

