import React from "react";
import "./SellerHeader.css"; // Styling file
import { FaUser, FaClipboardList, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SellerHeader = () => {
  const navigate = useNavigate();

  function handleAccountClick(e) {
    e.preventDefault();
    navigate('/seller/account'); // Navigate to seller account page
  }

  function handleOrdersClick(e) {
    e.preventDefault();
    navigate('/seller/orders'); // Navigate to seller orders page
  }

  function handleProductsClick(e) {
    e.preventDefault();
    navigate('/sellerhome'); // Navigate to seller products page
  }

  return (
    <header className="seller-header">
      <div className="seller-header-title">
        <h1>Mytalorzone By Sahiba - Seller Dashboard</h1>
      </div>

      <nav className="seller-header-menu">
        <ul>
          <li onClick={handleProductsClick}>Manage Products</li>
          <li onClick={handleOrdersClick}>View Orders</li>
          <li onClick={handleAccountClick}>Account Settings</li>
        </ul>
      </nav>

      <div className="seller-header-icons">
        <FaBoxOpen className="seller-header-icon" title="Manage Products" onClick={handleProductsClick} />
        <FaClipboardList className="seller-header-icon" title="View Orders" onClick={handleOrdersClick} />
        <FaUser className="seller-header-icon" title="Account Settings" onClick={handleAccountClick} />
      </div>
    </header>
  );
};

export default SellerHeader;
