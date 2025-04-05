import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RentalCard from "../components/Card";  
import "./Index.css";
import { handleError } from "../utils";

export default function Index() {
  const [rentals, setRentals] = useState([]);

  const navigate = useNavigate();
  const port = import.meta.env.VITE_BACKEND_PORT;

  // const loggedInUser=localStorage.getItem("_id");
  const loggedInUser = JSON.parse(localStorage.getItem('loginUser'));

  useEffect(() => {
    fetch(`http://localhost:${port}/rentals`) 
      .then((res) => res.json())
      .then((data) => setRentals(data))
      .catch((err) => console.error("Error fetching rentals:", err));
  }, []);

  localStorage.removeItem('redirectAfterLogin');
  const handleCardClick = (rentalId) => {
    if (loggedInUser) {
      navigate(`/rentals/${rentalId}`);
    } else {
      localStorage.setItem("redirectAfterLogin", `/rentals/${rentalId}`); 
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

