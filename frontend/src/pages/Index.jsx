
// import React, { useEffect, useState } from "react";
// import RentalCard from "../components/Card";  
// import "./Index.css";

// export default function Index() {
//   const [rentals, setRentals] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8080/rentals") 
//       .then((res) => res.json())
//       .then((data) => setRentals(data))
//       .catch((err) => console.error("Error fetching rentals:", err));
//   }, []);

//   return (
//     <div className="card-container">
//       {rentals.length > 0 ? (
//         rentals.map((rental) => (
//           <RentalCard key={rental._id} rental={rental} />
//         ))
//       ) : (
//         <div className="no-rentals">
//           <h2 className="text-muted">No Rentals Available</h2>
//           <p className="text-muted">Please Explore Other options!</p>
//         </div>
//       )}
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RentalCard from "../components/Card";  
import "./Index.css";

export default function Index({ user,setRedirectpath }) {
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/rentals") 
      .then((res) => res.json())
      .then((data) => setRentals(data))
      .catch((err) => console.error("Error fetching rentals:", err));
  }, []);

  const handleCardClick = (rentalId) => {
    if (user) {
      navigate(`/rentals/${rentalId}`);
    } else {
      setRedirectpath(`/rentals/${rentalId}`)
      // localStorage.setItem("redirectAfterLogin", `/rentals/${rentalId}`); 
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
