import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'; // Ensure to style using the provided CSS

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li> <Link to='/kurtas'>Kurtas</Link></li>
            <li><Link to="/ethinicwear">Ethinic</Link></li>
            <li><Link to="/bestsellers">Best sellers</Link></li>
            <li><Link to="/sarees">sarees</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Information</h3>
          <ul>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Connect With Us</h3>
          <ul>
            <li><Link to="/facebook">Facebook</Link></li>
            <li><Link to="/instagram">Instagram</Link></li>
            <li><Link to="/twitter">Twitter</Link></li>
            <li><Link to="/pinterest">Pinterest</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/returns-and-exchanges">Returns & Exchanges</Link></li>
            <li><Link to="/shipping-info">Shipping Information</Link></li>
            <li><Link to="/track-order">Track Order</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Mytalorzone By Sahiba. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
