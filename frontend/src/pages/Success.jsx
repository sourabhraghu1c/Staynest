import { useLocation, useNavigate } from "react-router-dom";

export default function Success() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <h2>Form Submitted Successfully!</h2>
            <button onClick={() => navigate("/")}>Go Back to Form</button>
        </div>
    );
}