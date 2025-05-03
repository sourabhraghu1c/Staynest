import { FaCompass } from "react-icons/fa";
import "./Navbar.css";
import SearchBar from "./Searchbar";
import Menu from "./Menu";
import { useAuth } from "../Context/AuthContext"; 

const Navbar = () => {
  const { loggedInUser } = useAuth(); 

  return (
    <div className="navbar">
      <div className="nav-left">
        <FaCompass className="icon" />
        <a href="/" className="nav-link">Explore</a>
      </div>

      <div className="nav-middle">
        <SearchBar />
      </div>

      <div className="nav-right">
        <div className="nav-right-btn">
          <button className="auth-btn">
              <a href="/services">Services</a>
          </button>
          {loggedInUser ? (
            <>
              {(loggedInUser.role === "PropertyOwner" || loggedInUser.role === "admin") && (
                <button className="auth-btn">
                  <a href="/rentals/new">Add rental</a>
                </button>
              )}

              {(loggedInUser.role === "Homeseeker" || loggedInUser.role === "admin") && (
                <button className="auth-btn">
                  <a href="/Roommates">Join rental</a>
                </button>
              )}
              <Menu />
            </>
          ) : (
            <button className="auth-btn">
              <a href="/login">Login/Register</a>
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
