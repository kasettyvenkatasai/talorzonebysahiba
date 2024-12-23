import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3020/register",
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      navigate("/");
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
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="login-form-input-group">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
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
          <button type="submit" className="login-form-btn">
            Register
          </button>
          <p>Already have an account ? <Link to='/'>Login</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Register;
