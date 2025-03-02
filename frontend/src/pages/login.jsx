

// import { useState} from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate,} from "react-router-dom";
// import "./Login.css";

// export default function Login() {
//     const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
//     const navigate = useNavigate();
//     const [errorMessage, setErrorMessage] = useState("");  // State to show error message

//     const onSubmit = async (data) => {
//         try {
//             let r = await fetch("http://localhost:8080/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });

//             let res = await r.json();

//             if (r.status === 401) { 
//                 setErrorMessage("Invalid username or password"); // Show error message
//                 reset(); // Clear the form fields
//                 return;
//             }

//             if (res.redirectUrl) {
//                 navigate("/"); // Redirect only on success
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             setErrorMessage("Invalid Crediantials");
//         }
//     };

//     return (
//         <div className="login-container">
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="container">
//                     <input placeholder="Username" {...register("username", { required: true })} type="text" />
//                     <br />
//                     <input placeholder="Password" {...register("password", {
//                         required: { value: true, message: "This field is required" },
//                         minLength: { value: 3, message: "Min length is 3" }
//                     })} type="password" />
//                     <br />
//                     {errors.password && <span>{errors.password.message}</span>}
//                     <br />
//                     {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
//                     <br />
//                     <input disabled={isSubmitting} type="submit" value="Login" />
//                 </div>
//             </form>

//             {/* New to Staynest? Signup Link */}
//             <div className="signup-section">
//                 <p>New to Staynest?</p>
//                 <button className="signup-btn" onClick={() => navigate("/signup")}>Sign Up</button>
//             </div>
//         </div>
//     );
// }


// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";

// export default function Login({ setUser }) {
//     const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
//     const navigate = useNavigate();
//     const [errorMessage, setErrorMessage] = useState("");

    

//     const onSubmit = async (data) => {
//         try {
//             let r = await fetch("http://localhost:8080/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(data),
//                 credentials: "include",  // Ensure cookies are sent if needed
//             });

//             let res = await r.json();

//             console.log(res);
            
//             if (r.status === 401) { 
//                 setErrorMessage("Invalid username or password");
//                 reset();
//                 return;
//             }

//             if (res) {
//                 //random check
//                 useEffect(() => {
//                 const fetchUser = async () => {
//                     try {
//                         const response = await axios.get("http://localhost:8080/api/current_user", { withCredentials: true });
//                         setUser(response.data.user);
//                         const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
//                         localStorage.removeItem("redirectAfterLogin");  // Clean up stored path
//                         navigate(redirectPath);
//                         } catch (error) {
//                         console.error("Error fetching user data:", error);
//                         setUser(null);
//                     }
//                 };
//                 fetchUser();
//             }, []);
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             setErrorMessage("Invalid Credentials");
//         }
//     };

//     return (
//         <div className="login-container">
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="container">
//                     <input placeholder="Username" {...register("username", { required: true })} type="text" />
//                     <br />
//                     <input placeholder="Password" {...register("password", {
//                         required: { value: true, message: "This field is required" },
//                         minLength: { value: 3, message: "Min length is 3" }
//                     })} type="password" />
//                     <br />
//                     {errors.password && <span>{errors.password.message}</span>}
//                     <br />
//                     {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
//                     <br />
//                     <input disabled={isSubmitting} type="submit" value="Login" />
//                 </div>
//             </form>

//             <div className="signup-section">
//                 <p>New to Staynest?</p>
//                 <button className="signup-btn" onClick={() => navigate("/signup")}>Sign Up</button>
//             </div>
//         </div>
//     );
// }


import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Login.css";

export default function Login({setUser,redirectPath,setRedirectpath }) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            let r = await fetch("http://localhost:8080/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });

            let res = await r.json();

            if (r.status === 401) { 
                setErrorMessage("Invalid username or password");
                reset();
                return;
            }

            if (res) {
                // Fetch user data after successful login
                const response = await axios.get("http://localhost:8080/api/current_user", { withCredentials: true });
                setUser(response.data.user);
                //go to the redirect path provided
                const path=redirectPath || "/";
                setRedirectpath(null);
                navigate(path);
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Invalid Credentials");
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
                    {errors.password && <span>{errors.password.message}</span>}
                    <br />
                    {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
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
