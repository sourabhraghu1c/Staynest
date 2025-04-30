import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from "../utils";
import styles from './Signup.module.css';
import { useAuth } from "../context/AuthContext";



export default function Signup() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const port = import.meta.env.VITE_BACKEND_PORT;
    const { login } = useAuth();


    // const onSubmit = async (data) => {
    //     try {
    //         const response = await fetch(`http://localhost:${port}/signup`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(data),
    //         });

    //         const result = await response.json();
    //         const { success, message, error } = result;

    //         if (success) {
    //             handleSuccess(message);
    //             setTimeout(() => navigate("/login"), 1000);
    //         } else if (error) {
    //             const details = error?.details?.[0]?.message || "Signup failed.";
    //             handleError(details);
    //         } else {
    //             handleError(message);
    //         }
    //     } catch (error) {
    //         handleError(error.message);
    //     }
    // };

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
                handleSuccess("Signup successful!");

                // Automatically login the user here
                const loginResponse = await fetch(`http://localhost:${port}/login`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: data.username,
                        password: data.password
                    }),
                    credentials: "include"
                });

                const loginResult = await loginResponse.json();
                const { success: loginSuccess, jwtToken, loginUser } = loginResult;

                if (loginSuccess) {
                    login(loginUser, jwtToken);
                    setTimeout(() => {
                        const path = localStorage.getItem("redirectAfterLogin") || "/";
                        navigate(path);
                    }, 1000);
                } else {
                    handleError("Signup successful, but login failed. Please try logging in manually.");
                    navigate("/login");
                }
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
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className={styles.heading}>
                    <h1>Welcome to Staynest</h1>
                    <p>Create your account to get started</p>
                </div>
                <div className={styles.formRow}>
                    <label htmlFor="username">Username:</label>
                    <input placeholder="Username" {...register("username", { required: true, minLength: 4 })} />
                    {errors.username && <span>Username is required (min 4 chars)</span>}
                </div>

                <div className={styles.formRow}>
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

                <div className={styles.formRow}>
                    <label htmlFor="email">Email (optional):</label>
                    <input placeholder="Email" {...register("email", { pattern: /^\S+@\S+$/i })} />
                    {errors.email && <span>Invalid email address</span>}
                </div>
                <div className={styles.formRow}>
                <label>Role:</label>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            value="PropertyOwner"
                            {...register("role", { required: true })}
                        />
                        Property Owner
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            value="Homeseeker"
                            {...register("role", { required: true })}
                        />
                        Home Seeker
                    </label>
                </div>
                {errors.role && <span className={styles.error}>Please select a role</span>}
            </div>


                <div className={styles.formRow}>
                    <label htmlFor="password">Create Password:</label>
                    <input
                        placeholder="Password"
                        type="password"
                        autoComplete="off"
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 4, message: "Password must be at least 4 characters" },
                            maxLength: { value: 100, message: "Password too long" }
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <input className={styles.signupBtn} disabled={isSubmitting} type="submit" value="Sign Up" />
            </form>
            <ToastContainer />
        </div>
    );
}
