import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link  } from "react-router-dom";
import { handleSuccess } from "../utils";
import "./Menu.css";

const Menu = () => {
    const { loggedInUser, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Toggle menu visibility
    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close menu and navigate
    const handleMenuClick = (callback) => {
        setMenuOpen(false); // Close menu
        callback(); // Execute function
    };

    const handleLogout = () => {
        handleMenuClick(() => {
            logout();
            handleSuccess("Log-Out Successful!");
            navigate("/");
        });
    };

    const handleProfileSettings = () => {
        handleMenuClick(() => navigate("/profile-settings"));
    };

    return (
        <div className="menu-container" ref={menuRef}>
            {/* Avatar Button */}
            <button className="menu-button" onClick={toggleMenu}>
                <img 
                    src={loggedInUser?.profileImage || "/default-avatar.png"} 
                    alt="User Avatar" 
                    className="avatar"
                />
            </button>

            {/* Dropdown Menu */}
            {menuOpen && (
                <ul className="menu-list">
                    <li className="menu-item" onClick={handleProfileSettings}>
                        Profile Settings
                    </li>

                    {(loggedInUser.role === 'PropertyOwner' || loggedInUser.role === 'admin') && (
                    <li className="menu-item" onClick={() => {
                        setMenuOpen(false);
                        navigate('#'); // Replace '#' with actual route if available
                    }}>
                        My Rentals
                    </li>
                    )}
                    {(loggedInUser.role === 'Homeseeker' || loggedInUser.role === 'admin') && (
                    <li className="menu-item" onClick={() => {
                        setMenuOpen(false);
                        navigate('/rentalpartner/new');
                    }}>
                        Add Roommate
                    </li>
                    )}




                    <li className="menu-item" onClick={() => {
                        setMenuOpen(false);
                        navigate("/about");
                    }}>
                        About Us!
                    </li>
                    <li className="menu-item" onClick={handleLogout}>
                        Log Out
                    </li>
                </ul>
            )}
        </div>
    );
};

export default Menu;
