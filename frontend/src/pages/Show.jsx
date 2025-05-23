import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Show.css";
import { handleError, handleSuccess } from "../utils";
import Map from "../components/Map";
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import Review from "../components/Review";

const Show = () => {
  const { id } = useParams(); // Get rental ID from URL
  const [rental, setRental] = useState(null);
  const [islistedByUser, setIslistedByUser] = useState(false); // State to check ownership
  const mapApiKey = import.meta.env.VITE_MAP_API_KEY;
  const port = import.meta.env.VITE_BACKEND_PORT;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const loggedInUser = JSON.parse(localStorage.getItem('loginUser'));
  const userId = loggedInUser._id;
  const UserRole=loggedInUser.role;

  useEffect(() => {
    const fetchRental = async () => {
      try {
        if (!token || !userId) {
          console.error("No token or user ID found. Please log in.");
          handleError("Please login first!");
          return;
        }

        const response = await fetch(`https://staynest-l88z.onrender.com/rentals/${id}`, {
          method: "GET",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch rental");
        }

        const data = await response.json();
        setRental(data);

        // Check if the logged-in user is the owner of the rental
        if (data.postedBy._id === userId ||UserRole==="admin") {
          setIslistedByUser(true);
        }
      } catch (err) {
        console.error("Error fetching rental:", err);
      }
    };

    fetchRental();
  }, [id]);

  if (!rental) return <h2>Loading...</h2>;

  const handleDeleteReview = async (review_id) => {
  try {
    if (!token) {
      handleError("Please login first!");
      return;
    }

    const response = await fetch(`https://staynest-l88z.onrender.com/rentals/${id}/reviews/${review_id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete review");
    }

    handleSuccess("Review deleted successfully!");

    setRental((prevRental) => {
  if (!prevRental || !prevRental.reviews) {
    return prevRental;
  }
  return {
    ...prevRental,
    reviews: prevRental.reviews.filter((review) => review._id !== review_id),
  };
});


  } catch (err) {
    console.error("Error deleting review:", err);
    handleError("Error deleting review. Please try again.");
  }
};

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        handleError("Please login first!");
        return;
      }

      const response = await fetch(`https://staynest-l88z.onrender.com/rentals/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete rental");
      }

      handleSuccess("Rental deleted successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error deleting rental:", err);
      handleError("Error deleting rental. Please try again.");
    }
  };

  return (
    <>
      <div className="rental-show-card-container">
        <div className="rental-show-card">
          <div>
            <h1>{rental.title}</h1>
          </div>
          <img
            src={rental.photos.url}
            className="show-card-img-top"
            alt={rental.title}
          />
          <div className="show-card-body">
            <p>
              Listed by: @<i>{rental.postedBy.username}</i>
            </p>
            <p>{rental.description}</p>
            <p>₹{rental.price.toLocaleString("en-IN")} per month</p>
            <p>{`${rental.location.address}(${rental.location.pincode})`}</p>
            <p>Property Type: {rental.propertyType}</p>
            <p>Facilities: {rental.facilities || "Not specified"}</p>
            <p>
              Contact: {rental.contact.name} ({rental.contact.phone})
            </p>
          </div>

          {/* Show Edit & Delete buttons only if user is the owner */}
          {islistedByUser && (
            <>
              <Stack direction="row" spacing={13.38}>
                <Button variant="contained" style={{ backgroundColor: "maroon" }} onClick={() => navigate(`/rentals/${rental._id}/edit`, { state: { rental } })}>
                  Edit
                </Button>

                <Button style={{color:"white",backgroundColor:"red",border:"none"}} variant="outlined" startIcon={<DeleteIcon  />} onClick={handleDelete}>
                  Delete
                </Button>
              </Stack>
            </>
          )}
        </div>
      </div>

      {/* Add Review */}
      {(UserRole === "admin" || UserRole === "Homeseeker") && (
        <div className="rental-show-card" style={{ height: "40vh" }}>
          <Review setRental={setRental} />
        </div>
      )}

      {/* show Reviews */}
      <hr />
        {rental.reviews && rental.reviews.length > 0 ? (
          rental.reviews.map((review, index) => (
            <div key={index} className="rental-show-card" style={{height:"40vh"}}>
              <hr />
              <p>Rating: {review.rating}⭐</p>
              <p>{review.comment}</p>
              {(userId === review.author._id || UserRole==="admin") && (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteReview(review._id)}
                >
                  Delete
                </Button>
              )}
              <hr />
            </div>
          ))
        ) : (
        <p>No reviews available</p>
        )}

      <div className="rental-show-card-container" >
        <div className="rental-show-card" >
          <div>
            <h2>Location Details:</h2>
          </div>
          <Map
            address={`${rental.location.address}, ${rental.location.state}, ${rental.location.pincode}`}
            apiKey={mapApiKey}
          />
        </div>
      </div>

    </>
  );
};

export default Show;
