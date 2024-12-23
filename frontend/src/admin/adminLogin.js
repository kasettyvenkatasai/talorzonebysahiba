import React, { useState  } from "react";
import { Link  , useNavigate} from "react-router-dom";
import "../user/LoginForm.css";
import axios from 'axios';
const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error message

  const handleLogin = async(e) => {
    e.preventDefault();
   try {
    const response = await axios.post('http://localhost:3020/adminlogin', {
      email: email,
      password: password
    }, { withCredentials: true });

    navigate('/adminhome');
    
   } catch (error) {
    if (error.response && error.response.data.message) {
      setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage("An error occurred. Please try again.");
    }
   }
  };

  return (
    <div style={{height:'600px'}}> 
    <div className="login-form-container">
      <h2>Login to Mytalorzone</h2>
      <form onSubmit={handleLogin} className="login-form-form">
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
        <button type="submit" className="login-form-btn">Login</button>
      </form>
      {errorMessage && (
            <p className="error-message">{errorMessage}</p> 
          )}
      <div className="login-form-links">
        <Link to="/forgot-password" className="login-form-forgot-password">Forgot Password?</Link>
        <Link to="/seller" className="login-form-create-account">Create a New Account</Link>
      </div>
    </div>
    </div>
  );
};

export default AdminLogin;
