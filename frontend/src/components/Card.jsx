
// import React from "react";
// import { Link } from "react-router-dom";
// import "./Card.css";

// const RentalCard = ({ rental }) => {
//   return (
//     <div className="rental-card">
//       <Link to={`/rentals/${rental._id}`} className="rental-link">
//         <img
//           src={rental.photos?.url || "https://content.jdmagicbox.com/comp/indore/x5/0731px731.x731.150609200023.l1x5/catalogue/fully-furnished-rooms-on-rent-nakshatra-road-indore-paying-guest-accommodation-for-men-4jza7zq.jpg"} // Use rental image from database
//           className="card-img-top"
//           alt={rental.title}
//           style={{ height: "20rem", width: "100%", objectFit: "cover" }}
//         />
//         <div className="card-body">
//           <p className="card-text">
//             <b>{rental.title}</b> <br />
//             &#8377;{rental.price.toLocaleString("en-IN")}/month
//           </p>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default RentalCard;




import React from "react";
import "./Card.css";

const RentalCard = ({ rental, onClick }) => {
  return (
    <div className="rental-card" onClick={onClick}>
      <div className="rental-link">
        <img
          src={rental.photos?.url || "https://content.jdmagicbox.com/comp/indore/x5/0731px731.x731.150609200023.l1x5/catalogue/fully-furnished-rooms-on-rent-nakshatra-road-indore-paying-guest-accommodation-for-men-4jza7zq.jpg"} 
          className="card-img-top"
          alt={rental.title}
          style={{ height: "20rem", width: "100%", objectFit: "cover" }}
        />
        <div className="card-body">
          <p className="card-text">
            <b>{rental.title}</b> <br />
            &#8377;{rental.price.toLocaleString("en-IN")}/month
          </p>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;

