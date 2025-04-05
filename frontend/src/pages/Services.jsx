import React from "react";
import "./Services.css";

const services = [
  {
    title: "Room Listings",
    description: "Explore hostels, PGs, and rental rooms across your city with verified listings.",
    icon: "🏠",
  },
  {
    title: "Room Partner Match",
    description: "Find your ideal roommate based on preferences and mutual interests.",
    icon: "🤝",
  },
  {
    title: "Easy Booking (Coming Soon......)",
    description: "Book rooms directly from the platform with secure communication.",
    icon: "📅",
  },
  {
    title: "Owner Dashboard",
    description: "Owners can add, manage, and edit room listings easily.",
    icon: "🧑‍💼",
  },
  {
    title: "Verified Profiles",
    description: "Ensuring trusted communication through verified user accounts.",
    icon: "✅",
  },
  {
    title: "Reviews & Ratings",
    description: "Read genuine reviews and ratings to make better rental choices.",
    icon: "⭐",
  },
];

export default function Services() {
  return (
    <div className="services-container">
      <h1 className="services-title">Our Services</h1>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h2 className="service-heading">{service.title}</h2>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
