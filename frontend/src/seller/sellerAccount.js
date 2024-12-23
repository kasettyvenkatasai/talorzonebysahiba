import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../user/UserPage.css";
import Cookies from 'js-cookie';
import {decodeToken } from "react-jwt";

const SellerAccount = () => {
  const [useremail, setUseremail] = useState('');
  const [username , setusername] = useState('');
  const [orders, setOrders] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(()=>{
    const token = Cookies.get('authToken2');
    console.log(token);
    if(token){
      try {
        const decoded = decodeToken(token);
        console.log(decoded);
        setUseremail(decoded.email);
        setusername(decoded.name);

        
      } catch (error) {
         console.error("token validation failed" ,error);
      }
    }
    else{
        console.log("no user details found");
    }
},[])

  const handleLogout = async () => {
      Cookies.remove('authToken2');
      navigate('/seller');
  };

  return (
    <div className="user-page-container">
      < h2 className="h2"> User Dashboard</h2>
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

      <div className="user-orders">
        <h3>My Orders</h3>
        {orders.length > 0 ? (
          <ul>
            {orders.map((order, index) => (
              <li key={index}>
                <strong>Order ID:</strong> {order.id} <br />
                <strong>Date:</strong> {new Date(order.date).toLocaleString()} <br />
                <strong>Status:</strong> {order.status}
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no orders yet.</p>
        )}
      </div>

      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default SellerAccount;
