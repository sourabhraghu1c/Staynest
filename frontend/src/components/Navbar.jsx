import { FaCompass } from "react-icons/fa";
import { FaSlidersH, FaSearch } from "react-icons/fa"; // FontAwesome Icons
import "./Navbar.css"; // Ensure styles are applied

const Navbar = () => {


const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:8080/logout", {
      method: "GET",
      credentials: "include", // Important for handling session cookies
    });

    if (response.ok) {
      // alert("Logout successful!"); // Show a success message
      window.location.href = "/"; // Redirect to home page after logout
    } else {
      alert("Logout failed. Please try again.");
    }
  } catch (error) {
    console.error("Logout Error:", error);
    alert("An error occurred while logging out.");
  }
};


  return (
    <nav className="navbar">
      {/* Left Side: Compass Icon and Explore */}
      <div className="nav-left">
        <FaCompass className="icon" />
        <a href="/" className="nav-link">Explore</a>
      </div>

      {/* Middle: Capsule Search Bar with Filter Button */}
      <div className="nav-middle">
        <form className="search-form" action="/rentals/search" method="get">
          <div className="search-container">
            <button className="filter-btn" type="button">
              <FaSlidersH />
            </button>
            <input
              className="search-inp"
              type="search"
              name="address"
              placeholder="Search Rentals"
              required
            />
            <button className="search-btn" type="submit">
              <FaSearch />
              Search
            </button>
          </div>
          {/* Hidden inputs for filter data */}
          <input type="hidden" name="price_range" id="priceRange" />
          <input type="hidden" name="property_type" id="propertyType" />
        </form>
      </div>

      {/* Right Side: Single Capsule Login/SignUp Button */}
      <div className="nav-right">
        <a href="#" className="nav-link">Add Rental</a>
        <button  className="auth-btn"><a style={{textDecoration:"none",color:"white"}} href="/login">Login</a></button>
        <button onClick={handleLogout} className="auth-btn">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
