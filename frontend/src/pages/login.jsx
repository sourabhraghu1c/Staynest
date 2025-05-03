import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";  
import { handleError, handleSuccess } from "../utils";
import styles from "./Login.module.css";


export default function Login() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const { login } = useAuth();  
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
            const { success, message, error, jwtToken, loginUser } = result;

            if (success) {
                handleSuccess(message);
                login(loginUser, jwtToken); 

                setTimeout(() => {
                    const path = localStorage.getItem("redirectAfterLogin") || "/";
                    navigate(path);
                }, 1000);
            } else if (error) {
                handleError(error?.details[0]?.message);
            } else if (!success) {
                handleError(message);
            }
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <div className={styles["login-container"]}>
        <div className={styles.form}>
            <div className={styles.heading}>
            <h1>Welcome Back</h1>
            <p>Login to continue</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className={styles.formRow}>
                <label htmlFor="username">Username:</label>
                <input
                placeholder="Username"
                {...register("username", { required: true })}
                type="text"
                />
                {errors.username && <span className={styles.error}>Username is required</span>}
            </div>

            <div className={styles.formRow}>
                <label htmlFor="password">Password:</label>
                <input
                placeholder="Password"
                {...register("password", {
                    required: { value: true, message: "This field is required" },
                    minLength: { value: 3, message: "Min length is 3" }
                })}
                type="password"
                />
                {errors.password && <span className={styles.error}>{errors.password.message}</span>}
            </div>

            <input disabled={isSubmitting} className={styles.loginBtn} type="submit" value="Login" />
            </form>

            <div className={styles.signupSection}>
            <p>New to Staynest?</p>
            <button className={styles.signupBtn} onClick={() => navigate("/signup")}>Sign Up</button>
            </div>
        </div>
        </div>

    );
}
