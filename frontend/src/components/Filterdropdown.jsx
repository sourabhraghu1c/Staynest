import { useState } from "react";
import "./Filterdropdown.css";

const FilterDropdown = ({ setPriceRange, setPropertyType, setShowFilters }) => {
  const priceMapping = {
    "Below ₹5000": "0-5000",
    "₹5000 - ₹8000": "5000-8000",
    "₹8000 - ₹12000": "8000-12000",
    "₹12000 - ₹15000": "12000-15000",
    "Above ₹15000": "15000-300000",
  };

  const priceRanges = Object.keys(priceMapping);
  const propertyTypes = ["1RK", "1BHK", "2BHK", "3BHK", "PG", "Hostel", "Single Room"];

  const [tempPriceRange, setTempPriceRange] = useState("");
  const [tempPropertyType, setTempPropertyType] = useState("");

  const applyFilters = () => {
    setPriceRange(tempPriceRange ? priceMapping[tempPriceRange] : ""); // Send numeric range
    setPropertyType(tempPropertyType);
    setShowFilters(false); // Close dropdown
  };

  return (
    <div className="filter-dropdown">
      <label>Price Range:</label>
      <div className="filter-buttons">
        {priceRanges.map((range) => (
          <button
            key={range}
            type="button"
            className={`filter-btn-option ${tempPriceRange === range ? "active" : ""}`}
            onClick={() => setTempPriceRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      <label>Property Type:</label>
      <div className="filter-buttons">
        {propertyTypes.map((type) => (
          <button
            key={type}
            type="button"
            className={`filter-btn-option ${tempPropertyType === type ? "active" : ""}`}
            onClick={() => setTempPropertyType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <button className="apply-btn" type="button" onClick={applyFilters}>
        Apply
      </button>
    </div>
  );
};

export default FilterDropdown;
