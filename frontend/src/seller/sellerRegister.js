import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../user/LoginForm.css";
import axios from "axios";

const SellerRegister = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName,setbusinessName] = useState('');
  const [errormessage, setErrormessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3020/seller-register",
        {
          name:Name,
          email: email,
          password: password,
          businessName:businessName
        },
        { withCredentials: true }
      );

      navigate("/sellerlogin");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrormessage(error.response.data.message);
      } else {
        setErrormessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div style={{ height: "600px" }}>
      <div className="login-form-container">
        <h2>Register</h2>
        <form onSubmit={handleLogin} className="login-form-form">
          {errormessage && (
            <div className="error-message">{errormessage}</div>
          )}
          
          <div className="login-form-input-group">
            <label htmlFor="name"> Name</label>
            <input
              type="text"
              id="name"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="login-form-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="login-form-input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="login-form-input-group">
            <label htmlFor="businessName">Business name</label>
            <input
              type="text"
              id="businessName"
              value={businessName}
              onChange={(e) => setbusinessName(e.target.value)}
              placeholder="Enter Business name"
              required
            />
          </div>
          <button type="submit" className="login-form-btn">
            Register
          </button>
         <p>Already have and account ? <Link to="/sellerlogin" className="login-form-forgot-password">Login</Link> </p>
        </form>
      </div>
    </div>
  );
};

export default SellerRegister;
