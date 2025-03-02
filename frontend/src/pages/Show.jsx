
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Show.css";

// const RentalCard = () => {
//   return (
//     <div className="rental-card">
//         <div>
//             <h3>Title</h3>
//         </div>
//         <img
//           src= "https://content.jdmagicbox.com/comp/indore/x5/0731px731.x731.150609200023.l1x5/catalogue/fully-furnished-rooms-on-rent-nakshatra-road-indore-paying-guest-accommodation-for-men-4jza7zq.jpg" // Use rental image from database
//           className="card-img-top"
//           alt="title"
//           style={{ height: "20rem", width: "100%", objectFit: "cover" }}
//         />
//         <div className="card-body">
//             <p>Owned by: <i>Owner Name</i></p>
//             <p>Description</p>
//             <p>₹Price per month</p>
//             <p>Address, State - Pincode</p>
//             <p>Property Type: Type</p>
//             <p>Facilities: Not specified</p>
//             <p>Contact: Contact Name (Phone Number)</p>
//             <p>Email: email@example.com</p>
//         </div>
//     </div>
//   );
// };

// export default RentalCard;




// import React from "react";
// import "./Show.css";

// const Show = () => {
//   return (
//     <div className="rental-show-card-container">
//       <div className="rental-show-card">
//         <div>
//           <h1>Spacious PG Near City Center</h1>
//         </div>
//         <img
//           src="https://content.jdmagicbox.com/comp/indore/x5/0731px731.x731.150609200023.l1x5/catalogue/fully-furnished-rooms-on-rent-nakshatra-road-indore-paying-guest-accommodation-for-men-4jza7zq.jpg"
//           className="show-card-img-top"
//           alt="title"
//         />
//         <div className="show-card-body">
//           <p>Owned by: <i>sourabh</i></p>
//           <p>Fully furnished PG with easy access to all amenities and public transportation.</p>
//           <p>₹75,000 per month</p>
//           <p>Bholaram Ustad Marg,Indore, Madhya Pradesh - 123456</p>
//           <p>Property Type: PG</p>
//           <p>Facilities: wifi</p>
//           <p>Contact: Sourabh (1234567891)</p>
//           <p>Email: email@example.com</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Show;



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Show.css";

const Show = () => {
  const { id } = useParams(); // Get rental ID from URL
  const [rental, setRental] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/rentals/${id}`)
      .then((res) => res.json())
      .then((data) => setRental(data))
      .catch((err) => console.error("Error fetching rental:", err));
  }, [id]);

  if (!rental) return <h2>Loading...</h2>;

  return (
    <div className="rental-show-card-container">
      <div className="rental-show-card">
        <div>
          <h1>{rental.title}</h1>
        </div>
        <img src={rental.photos.url} className="show-card-img-top" alt={rental.title} />
        <div className="show-card-body">
          <p>Owned by: <i>{rental.owner.username}</i></p>
          <p>{rental.description}</p>
          <p>₹{rental.price.toLocaleString("en-IN")} per month</p>
          <p>{rental.location.address}</p>
          <p>Property Type: {rental.propertyType}</p>
          <p>Facilities: {rental.facilities || "Not specified"}</p>
          <p>Contact: {rental.contact.name} ({rental.contact.phone})</p>
        </div>
      </div>
    </div>
  );
};

export default Show;
