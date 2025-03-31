
import React, { useState } from 'react';
import { Box, Rating, Typography, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import './Review.css';


export default function Review({ setRental }) {
  const { id } = useParams(); // Get rental ID from URL
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);
  const port = import.meta.env.VITE_BACKEND_PORT;
  const token = localStorage.getItem("token");
  const loggedInUser = JSON.parse(localStorage.getItem('loginUser'));
  const userId = loggedInUser._id;
  // const userId = localStorage.getItem("_id");
  const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//   event.preventDefault();

//   const reviewData = {
//     review: {
//       rating,
//       comment,
//     },
//   };

//   try {
//     const response = await fetch(`http://localhost:${port}/rentals/${id}/reviews`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify(reviewData),
//     });

//     if (!response.ok) {
//       throw new Error("Failed to submit review");
//     }

//     const newReview = await response.json();
//     console.log("Review submitted:", newReview);
//     setRating(1);
//     setComment("");

// // Update state: add the new review
// setRental((prevRental) => {
//   if (!prevRental || !prevRental.reviews) {
//     return { ...prevRental, reviews: [newReview.review] }; // Initialize reviews array
//   }
//   return {
//     ...prevRental,
//     reviews: [...prevRental.reviews, newReview.review],
//   };
// });

//   } catch (err) {
//     setError(err.message);
//     console.error("Error submitting review:", err);
//   }
// };

const handleSubmit = async (event) => {
  event.preventDefault();

  const reviewData = {
    review: {
      rating,
      comment,
    },
  };

  try {
    const response = await fetch(`http://localhost:${port}/rentals/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      throw new Error("Failed to submit review");
    }

    const newReview = await response.json();
    console.log("Review submitted:", newReview);
    setRating(1);
    setComment("");

    // Ensure the new review has the correct author ID
    setRental((prevRental) => {
      if (!prevRental || !prevRental.reviews) {
        return {
          ...prevRental,
          reviews: [{ ...newReview.review, author: { _id: userId } }],
        };
      }
      return {
        ...prevRental,
        reviews: [...prevRental.reviews, { ...newReview.review, author: { _id: userId } }],
      };
    });

  } catch (err) {
    setError(err.message);
    console.error("Error submitting review:", err);
  }
};


  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: 'auto', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Typography variant="h4" style={{marginRight:"auto",marginBottom:"0.5rem"}}>Leave a review:</Typography>
      <div style={{display:"flex",flexDirection:"row",marginRight:"auto"}}>
        <Typography component="legend" style={{marginRight:"auto",fontWeight:"400",fontSize:"25px"}}>Ratings: </Typography>
        <Rating
        name="rating"
        value={rating}
        size="large"
        onChange={(event, newValue) => {
          setRating(newValue || 1);
        }}
      />
      </div>

      <TextField
        label="Comments"
        rows={1}
        variant="outlined"
        required
        fullWidth
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />

      {error && <Typography color="error">{error}</Typography>}

      <Button type="submit" variant="contained" style={{backgroundColor:"maroon",marginRight:"75vh"}}>
        Submit
      </Button>
    </Box>
  );
}









  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const reviewData = {
  //     review: {
  //       rating,
  //       comment
  //     }
  //   };

  //   try {
  //     const response = await fetch(`http://localhost:${port}/rentals/${id}/reviews`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": token
  //       },
  //       body: JSON.stringify(reviewData),
  //       credentials: "include" // Ensure cookies (session) are sent for authentication
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to submit review");
  //     }

  //     const result = await response.json();
  //     console.log("Review submitted:", result);
  //     setRating(1);
  //     setComment("");
  //     navigate(`/rentals/${id}`);

  //   } catch (err) {
  //     setError(err.message);
  //     console.error("Error submitting review:", err);
  //   }
  // };