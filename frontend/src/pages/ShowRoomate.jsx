import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ShowRoommate.css";
import { handleError, handleSuccess } from "../utils";
import Map from "../components/Map";
import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';

const ShowRoommate = () => {
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

        const response = await fetch(`http://localhost:${port}/rentals/${id}`, {
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

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        handleError("Please login first!");
        return;
      }

      const response = await fetch(`http://localhost:${port}/rentalpartner/${id}`, {
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
      <div className="rental-showRoommate-card-container">
        <div className="rental-showRoommate-card">
            
          <img
            src={rental.photos.url}
            className="showRoommate-card-img-top"
            alt={rental.title}
          />
          <div className="showRoommate-card-body">
            <p>
              Listed by: @<i>{rental.postedBy.username}</i>
            </p>
            <h1>Rental details:</h1>
            <h3>{rental.title}</h3>
            <br />
            <p>{rental.description}</p>
            <p>₹{rental.price.toLocaleString("en-IN")} per month</p>
            <p>{`${rental.location.address}(${rental.location.pincode})`}</p>
            <p>Property Type: {rental.propertyType}</p>
            <p>Facilities: {rental.facilities || "Not specified"}</p>
            <h1>Roompartner Details:</h1>
            <p>
              Contact: {rental.contact.name} ({rental.contact.phone})
            </p>
            <p>
              Email: {rental.postedBy.email}
            </p>
            {/* <p>
              Contact: {rental.contact.name} ({rental.contact.phone})
            </p> */}
          </div>
          {islistedByUser && (
            <>
              <Stack direction="row" spacing={13.38}>
                <Button style={{color:"white",backgroundColor:"red",border:"none"}} variant="outlined" startIcon={<DeleteIcon  />} onClick={handleDelete}>
                  Delete
                </Button>
              </Stack>
            </>
          )}
        </div>
      </div>
      
      <div className="rental-showRoommate-card-container" >
        <div className="rental-showRoommate-card" >
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

export default ShowRoommate;