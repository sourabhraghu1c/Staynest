import { FaCompass } from "react-icons/fa";
import "./Navbar.css";
import SearchBar from "./Searchbar";
import Menu from "./Menu";
import { useAuth } from "../context/AuthContext"; 

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
          {loggedInUser ? (
            <>
            <form className="auth-form" action="/rentals/new">
              <button type="submit" className="auth-btn">Add rental</button>
            </form>
              < Menu />
            </>
          ) : (
            <>
            <button className="auth-btn">
              <a href="/services">Services</a>
            </button>
            <button className="auth-btn">
              <a href="/login">Login/Register</a>
            </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
