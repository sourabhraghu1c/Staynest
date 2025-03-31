import { FaCompass } from "react-icons/fa";
import "./Navbar.css"; 
import SearchBar from "./Searchbar"; // Import the new SearchBar component
import MenuSimple from "./Menu";


const Navbar = () => {

  const loggedInUser = JSON.parse(localStorage.getItem('loginUser'));

  return (
    <nav className="navbar">
      <div className="nav-left">
        <FaCompass className="icon" />
        <a href="/" className="nav-link">Explore</a>
      </div>

      {/* Middle: Using the SearchBar component */}
      <div className="nav-middle">
        <SearchBar />
      </div>

      <div className="nav-right">
        {loggedInUser ? (
          <form action="/rentals/new">
            <button type="submit" className="auth-btn">Add rental</button>
          </form>
        ) : (
          <form action="/login">
            <button type="submit" className="auth-btn">Add Your rental</button>
          </form>
        )}
        {!loggedInUser ? (
          <button className="auth-btn">
            <a style={{ textDecoration: "none", color: "white" }} href="/login">Login</a>
          </button>
        ) : (
            <MenuSimple loggedInUser={loggedInUser}></MenuSimple>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
