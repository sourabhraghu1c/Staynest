import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RentalCard from "../components/Card";  
import "./Index.css";
import { handleError } from "../utils";

export default function Filtereddata() {
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  // const loggedInUser = localStorage.getItem("_id");
  const loggedInUser = JSON.parse(localStorage.getItem('loginUser'));
  // const userId = loggedInUser._id;

  useEffect(() => {
    if (location.state?.rentals) {
      setRentals(location.state.rentals);
    } else {
      setRentals([]);
    }
  }, [location.state]); // Runs when search results change

  const handleCardClick = (rentalId) => {
    if (loggedInUser) {
      navigate(`/rentals/${rentalId}`);
    } else {
      localStorage.setItem("redirectAfterLogin", `/rentals/${rentalId}`);
      handleError("Please login first!");
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
          <h2 className="text-muted">No Rentals matches with your filters!</h2>
          <p className="text-muted">Please Explore Other Options!</p>
        </div>
      )}
    </div>
  );
}
