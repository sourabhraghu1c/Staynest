import React from "react";
import "./Footer.css";
import { FaFacebookSquare, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="f-info">
        <div className="f-info-socials">
          <FaFacebookSquare className="social-icon" />
          <FaInstagramSquare className="social-icon" />
          <FaLinkedin className="social-icon" />
        </div>
        <div className="f-info-brand">&copy; Staynest Private Limited</div>
        <div className="f-info-links">
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
