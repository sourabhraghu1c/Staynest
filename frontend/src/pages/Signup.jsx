import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            let response = await fetch("http://localhost:8080/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            let res = await response.json(); // Get JSON response

            if (res.success) {
                navigate(res.redirectUrl); // Redirect to success page
            } else {
                alert(res.message); // Show error message
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container">
                <input placeholder="Username" {...register("username", { required: true })} type="text" />
                <br />
                <input placeholder="Email" {...register("email", { required: true })} type="email" />
                <br />
                <input placeholder="Password" {...register("password", { required: { value: true, message: "This field is required" }, minLength: { value: 3, message: "Min length is 3" } })} type="password" />
                <br />
                {errors.password && <span>{errors.password.message}</span>}
                <br />
                <input disabled={isSubmitting} type="submit" value="Sign Up" />
            </div>
        </form>
    );
}
