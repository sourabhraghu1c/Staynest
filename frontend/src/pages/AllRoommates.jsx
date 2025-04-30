import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RentalCard from "../components/Card";  
import "./Index.css";
import { handleError } from "../utils";

export default function AllRoommates() {
    const [rentals, setRentals] = useState([]);

    const navigate = useNavigate();
    const port = import.meta.env.VITE_BACKEND_PORT;

    // const loggedInUser=localStorage.getItem("_id");
    const loggedInUser = JSON.parse(localStorage.getItem('loginUser'));

useEffect(() => {
    const fetchRentals = async () => {
        try {
            const token = localStorage.getItem("token"); // or however you're storing the token
            const response = await fetch(`http://localhost:${port}/rentalpartner`, {
                method: "GET",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setRentals(data);
        } catch (err) {
            console.error("Error fetching rentals:", err);
        }
    };

    fetchRentals();
}, []);


    localStorage.removeItem('redirectAfterLogin');
    const handleCardClick = (rentalId) => {
        if (loggedInUser) {
        navigate(`/rentalpartner/${rentalId}`);
        } else {
        localStorage.setItem("redirectAfterLogin", `/rentalpartner/${rentalId}`); 
        handleError("please login first!");
        navigate("/login");
        }
    };

    return (
        <div className="card-container">
        {rentals.length > 0 ? (
            rentals.map((rental) => (
            <RentalCard key={rental._id} rental={rental} onClick={() => handleCardClick(rental._id)} />
            ))
        ) : (
            <div className="no-rentals">
            <h2 className="text-muted">No Rentals Available</h2>
            <p className="text-muted">Please Explore Other options!</p>
            </div>
        )}
        </div>
    );
}

