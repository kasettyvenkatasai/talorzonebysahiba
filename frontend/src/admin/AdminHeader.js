import React from "react";
import "./AdminHeader.css"; 
import { FaUsers, FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const navigate = useNavigate();

  function handleCustomersClick(e) {
    e.preventDefault();
    navigate('/adminhome'); 
  }

  function handleSellersClick(e) {
    e.preventDefault();
    navigate('/admin-sellers'); 
  }

  return (
    <header className="admin-header">
      <div className="admin-header-title">
        <h1>Mytalorzone By Sahiba - Admin Dashboard</h1>
      </div>

      <nav className="admin-header-menu">
        <ul>
          <li onClick={handleCustomersClick}>Manage Customers</li>
          <li onClick={handleSellersClick}>Manage Sellers</li>
        </ul>
      </nav>

      <div className="admin-header-icons">
        <FaUsers 
          className="admin-header-icon" 
          title="Manage Customers" 
          onClick={handleCustomersClick} 
        />
        <FaStore 
          className="admin-header-icon" 
          title="Manage Sellers" 
          onClick={handleSellersClick} 
        />
      </div>
    </header>
  );
};

export default AdminHeader;
