import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./loginSignup.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize navigation function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Form Submitted:", formData);
  };

  return (
    <div className="container">
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
