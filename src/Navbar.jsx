import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import "./home.css";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <div className="navbar">
            <div className="logo">WMS</div>
            <div className="search-container">
                <FaSearch className="search-icon" />
                <input type="text" placeholder="Search..." className="search-bar" />
            </div>
            <div className="nav-icons">
                <button className="icon-button"><FaBell /></button>
                <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
                <button className="signup-btn" onClick={() => navigate("/signup")}>Signup</button>
            </div>
        </div>
    );
};

export default Navbar;
