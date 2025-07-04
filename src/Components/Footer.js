import React from "react";
import { Link } from "react-router-dom";
import './footer.css';
import { FaHome, FaUtensils, FaSignOutAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-container">
      <nav className="footer-nav">
        <Link to="/home" className="footer-link">
          <FaHome className="footer-icon" />
          <span>Home</span>
        </Link>
        <Link to="/restaurent" className="footer-link">
          <FaUtensils className="footer-icon" />
          <span>Restaurants</span>
        </Link>
        <Link to="/" className="footer-link">
          <FaSignOutAlt className="footer-icon" />
          <span>Sign-out</span>
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
