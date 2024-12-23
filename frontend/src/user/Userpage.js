import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserPage.css";
import Cookies from 'js-cookie';
import { decodeToken } from "react-jwt";

const UserPage = () => {
  const [useremail, setUseremail] = useState('');
  const [username, setUsername] = useState('');
  const [orders, setOrders] = useState([]); // State is now an array
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      try {
        const decoded = decodeToken(token);
        setUseremail(decoded.email);
        setUsername(decoded.name);
        fetchOrders(decoded.email);
      } catch (error) {
        console.error("Token validation failed", error);
      }
    } else {
      console.log("No user details found");
    }
  }, []);

  const fetchOrders = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3020/fetchorders/${email}`);
      console.log("API Response:", response.data); // Log the entire response
  
      // Check if response.data is an array or object
      if (Array.isArray(response.data)) {
        console.log("Orders:", response.data); // Directly log the orders array
        setOrders(response.data); // Set the array as orders
      } else if (response.data.productDetails && Array.isArray(response.data.productDetails)) {
        console.log("Product Details:", response.data.productDetails); // Log productDetails if present
        setOrders(response.data.productDetails); // Set the productDetails array as orders
      } else {
        setOrders([]); // If no orders found, set to an empty array
        setErrorMessage("No product details found.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setErrorMessage("Failed to fetch orders.");
    }
  };
  

  // This useEffect will log the updated orders after it's set
  useEffect(() => {
    console.log("Updated Orders:", orders); // This logs the updated orders
  }, [orders]);

  const handleLogout = async () => {
    Cookies.remove('authToken');
    navigate('/');
  };

  return (
    <div className="user-page-container">
      <h2 className="h2">User Dashboard</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {username || useremail ? (
        <div className="user-details">
          <h3>My Details</h3>
          <p><strong>Name:</strong> {username}</p>
          <p><strong>Email:</strong> {useremail}</p>
        </div>
      ) : (
        <p>Loading user details...</p>
      )}

      <div className="user-orders" >
        <h3>My Orders:</h3>
        {orders.length > 0 ? (
  orders.map((order, index) => (
    <div key={index}>
      
      <p><strong>Item {index + 1}</strong></p> {/* Display item number */}
      <img src={order.image} alt="new image" style={{width:'100px', height:'100px'}} /><br></br>
      <strong>Name:</strong> {order.name} <br />
      <strong>Price:</strong> {order.price} <br />
      
      {/* You can add more product details here */}
    </div>
  ))
) : (
  <p>You have no orders yet.</p>
)}
      </div>

      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default UserPage;
