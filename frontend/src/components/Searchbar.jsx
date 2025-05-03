import * as React from 'react';
import { useState } from "react";
import { FaSlidersH, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // For navigation
import "./Searchbar.css";
import FilterDropdown from "./Filterdropdown";

const SearchBar = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [address, setAddress] = useState(""); // Store search input value
  const port = import.meta.env.VITE_BACKEND_PORT;

  const navigate = useNavigate();

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

const handleSearch = async (e) => {
  e.preventDefault();

  const queryParams = new URLSearchParams();
  if (address) queryParams.append("address", address);
  if (priceRange) queryParams.append("price_range", priceRange);
  if (propertyType) queryParams.append("property_type", propertyType);

  try {
    const response = await fetch(`https://staynest-l88z.onrender.com/rentals/search?${queryParams.toString()}`);
    const text = await response.text();
    const data = JSON.parse(text);
    navigate("/rentals", { state: { rentals: data.rentals } });

    // Clear input fields after search
    setAddress("");
    setPriceRange("");
    setPropertyType("");
  } catch (error) {
    console.error("Error fetching rentals:", error);
  }
};


  return (
    <div className="search-bar-container">
      <form className="search-form" onSubmit={handleSearch}>
        <div className="search-container">
          <button className="filter-btn" type="button" onClick={toggleFilters}>
            <FaSlidersH ></FaSlidersH>
          </button>
          <input
            className="search-inp"
            type="search"
            name="address"
            placeholder="Search Rentals (eg:station road,indore)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
          <button className="search-btn" type="submit">
            <FaSearch />
            Search
          </button>
          
        

        {/* Filter Dropdown */}
        {showFilters && (
          <FilterDropdown
            setPriceRange={setPriceRange}
            setPropertyType={setPropertyType}
            setShowFilters={setShowFilters}
          />
        )}
      </form>
    </div>
  );
};
export default SearchBar;
