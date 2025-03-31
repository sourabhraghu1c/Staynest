import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from "../utils";

export default function Signup() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const port = import.meta.env.VITE_BACKEND_PORT;

    const onSubmit = async (data) => {
        try {
            let response = await fetch(`http://localhost:${port}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            let result = await response.json(); // Get JSON response
            const {success,message,error}=result;
            if(success){
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login");
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
            // console.error("Signup error:", error);
            // alert("Something went wrong. Please try again.");
            handleError(error);
        }
    };

    return (
        
        <div className="container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="username">Username:</label>
                <input placeholder="Username" autoFocus {...register("username", { required: true })} type="text" />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input placeholder="Email" {...register("email", { required: true })} type="email" />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input placeholder="Password" {...register("password", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Min length is 3" } })} type="password" />
                {errors.password && <span>{errors.password.message}</span>}
            </div>
                <input disabled={isSubmitting} type="submit" value="Sign Up" />
        </form>
        <ToastContainer/>
        </div>
        
    );
}
