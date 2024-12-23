import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomersList.css"; // Styling file
import { useNavigate } from "react-router-dom";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:3020/fetchcustomers"); // Replace with your API endpoint
      setCustomers(response.data);
      setError(""); // Clear error on successful fetch
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to fetch customers. Please try again later.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3020/deleteuser/${id}`); // Replace with your delete API endpoint
      navigate(0);
    } catch (err) {
      console.error("Error deleting customer:", err);
      setError("Failed to delete customer. Please try again.");
    }
  };

  return (
    <div className="customer-list-container">
      <h1>Customer List</h1>
      {error && <div className="error-message">{error}</div>}

      {customers.length > 0 ? (
        <ul className="customer-list">
          {customers.map((customer) => (
            <li key={customer._id} className="customer-item">
              <strong>Name:</strong> {customer.name} <br />
              <strong>Email:</strong> {customer.email} <br />
              <button
                className="delete-button"
                onClick={() => handleDelete(customer._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No customers found.</p>
      )}
    </div>
  );
};

export default CustomerList;
