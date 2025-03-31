import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import axios from "axios"; 
import "./Login.css";

export default function Login() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const port = import.meta.env.VITE_BACKEND_PORT;

    const onSubmit = async (data) => {
        try {
            let response = await fetch(`http://localhost:${port}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });

            const result = await response.json();
            const {success,message,error,jwtToken,loginUser}=result;
            
            if(success){
                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loginUser', JSON.stringify(loginUser));
                setTimeout(() => {
                    const path=localStorage.getItem("redirectAfterLogin") || "/";
                    navigate(path);
                }, 1000);
            }
            else if(error){
                //in case of server side error
                const details=error?.details[0].message;
                handleError(details);
                }
            else if(!success){
                handleError(message);
            }
            
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="container">
                    <input placeholder="Username" {...register("username", { required: true })} type="text" />
                    <br />
                    <input placeholder="Password" {...register("password", {
                        required: { value: true, message: "This field is required" },
                        minLength: { value: 3, message: "Min length is 3" }
                    })} type="password" />
                    <br />
                    <input disabled={isSubmitting} type="submit" value="Login" />
                </div>
            </form>

            <div className="signup-section">
                <p>New to Staynest?</p>
                <button className="signup-btn" onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
        </div>
    );
}
