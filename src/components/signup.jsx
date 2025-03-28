import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginSignup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress1: "",
    companyAddress2: "",
    companyAddress3: "",
    companyContact: "",
    fullName: "",
    email: "",
    phone: "",
    role: "Admin",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();
  const [error, setError] = useState(""); // State to handle errors

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Signup successful!");
        navigate("/login");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Something went wrong");
    }
  };
  

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Company Name</label>
            <input className="input-field" type="text" name="companyName" placeholder="Enter company name" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Company Address</label>
            <input className="input-field" type="text" name="companyAddress1" placeholder="Address Line 1" onChange={handleChange} required />
            <input className="input-field" type="text" name="companyAddress2" placeholder="Address Line 2" onChange={handleChange} />
            <input className="input-field" type="text" name="companyAddress3" placeholder="Address Line 3" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Company Contact Email/Phone</label>
            <input className="input-field" type="text" name="companyContact" placeholder="Company contact email or phone" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Full Name</label>
            <input className="input-field" type="text" name="fullName" placeholder="Enter your full name" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input className="input-field" type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Phone Number (Optional)</label>
            <input className="input-field" type="text" name="phone" placeholder="Enter your phone number" onChange={handleChange} />
          </div>
          <div className="input-group">
            <label>Role</label>
            <select className="input-field" name="role" onChange={handleChange} required>
              <option value="Admin">Admin</option>
              <option value="Manager">Manager</option>
              <option value="Staff">Staff</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <div className="input-group">
            <label>Password</label>
            <input className="input-field" type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input className="input-field" type="password" name="confirmPassword" placeholder="Confirm your password" onChange={handleChange} required />
          </div>
          <div className="input-group checkbox-group">
            <input type="checkbox" name="termsAccepted" onChange={handleChange} required />
            <label>I agree to the Terms & Conditions</label>
          </div>
          <button className="button" type="submit">Sign Up</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Error display */}
        <p className="toggle-text">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="link-text">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
