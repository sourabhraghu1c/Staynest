import { FaCompass } from "react-icons/fa";
import "./Navbar.css";
import SearchBar from "./Searchbar";
import Menu from "./Menu";
import { useAuth } from "../Context/AuthContext"; 
import { Link } from "react-router-dom";


const Navbar = () => {
  const { loggedInUser } = useAuth(); 

  return (
    <div className="navbar">
      <div className="nav-left">
        <FaCompass className="icon" />
        <Link to="/" className="nav-link">Explore</Link>
      </div>

      <div className="nav-middle">
        <SearchBar />
      </div>

      <div className="nav-right">
        <div className="nav-right-btn">
          <button className="auth-btn">
              <Link to="/services">Services</Link>
          </button>
          {loggedInUser ? (
            <>
              {(loggedInUser.role === "PropertyOwner" || loggedInUser.role === "admin") && (
                <button className="auth-btn">
                  <Link to="/rentals/new">Add rental</Link>
                </button>
              )}

              {(loggedInUser.role === "Homeseeker" || loggedInUser.role === "admin") && (
                <button className="auth-btn">
                  <Link to="/Roommates">Join rental</Link>
                </button>
              )}
              <Menu />
            </>
          ) : (
            <button className="auth-btn">
              <Link to="/login">Login/Register</Link>
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
