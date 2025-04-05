import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";

export default function Signup() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const port = import.meta.env.VITE_BACKEND_PORT;

    const onSubmit = async (data) => {
        try {
            const response = await fetch(`http://localhost:${port}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate("/login"), 1000);
            } else if (error) {
                const details = error?.details?.[0]?.message || "Signup failed.";
                handleError(details);
            } else {
                handleError(message);
            }
        } catch (error) {
            handleError(error.message);
        }
    };

    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div>
                    <label htmlFor="username">Username:</label>
                    <input placeholder="Username" {...register("username", { required: true, minLength: 4 })} />
                    {errors.username && <span>Username is required (min 4 chars)</span>}
                </div>

                <div>
                    <label htmlFor="phonenumber">Phone Number:</label>
                    <input
                        placeholder="Phone Number"
                        {...register("phonenumber", {
                            required: true,
                            pattern: {
                                value: /^\d{10}$/,
                                message: "Phone number must be 10 digits"
                            }
                        })}
                    />
                    {errors.phonenumber && <span>{errors.phonenumber.message}</span>}
                </div>

                <div>
                    <label htmlFor="email">Email (optional):</label>
                    <input placeholder="Email" {...register("email", { pattern: /^\S+@\S+$/i })} />
                    {errors.email && <span>Invalid email address</span>}
                </div>

                <div>
                    <label>Role:</label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="PropertyOwner"
                                {...register("role", { required: true })}
                            />
                            Property Owner
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="Homeseeker"
                                {...register("role", { required: true })}
                            />
                            Home Seeker
                        </label>
                    </div>
                    {errors.role && <span>Please select a role</span>}
                </div>

                <div>
                    <label htmlFor="password">Create Password:</label>
                    <input
                        placeholder="Password"
                        type="text"
                        autoComplete="off"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 4, message: "Password must be at least 4 characters" },
                            maxLength: { value: 100, message: "Password too long" }
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <input disabled={isSubmitting} type="submit" value="Sign Up" />
            </form>
            <ToastContainer />
        </div>
    );
}
