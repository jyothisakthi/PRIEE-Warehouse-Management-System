import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./loginSignup.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState(""); // State to handle errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Login successful!");
        console.log("User:", data.user);
        // navigate("/dashboard"); // or wherever you want
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };
  

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input className="input-field" type="email" name="email" placeholder="Enter your email" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input className="input-field" type="password" name="password" placeholder="Enter your password" onChange={handleChange} required />
          </div>

          <button className="button" type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>} {/* Error display */}
        <p className="toggle-text">
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")} className="link-text">
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
