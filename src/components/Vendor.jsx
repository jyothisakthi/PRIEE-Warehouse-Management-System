import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "../styles/Vendor.css";

const Vendor = () => {
    const navigate = useNavigate();
    
    // Dummy vendor list (Replace this with MongoDB data fetching later)
    const [vendors, setVendors] = useState([]);

    return (
        <div className="home-container">
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="right-pane">
                    <div className="vendor-list">
                        {vendors.length === 0 ? (
                            <span className="vendor-message">No Vendors</span>
                        ) : (
                            <ul>
                                {vendors.map((vendor, index) => (
                                    <li key={index} className="vendor-item">
                                        {vendor}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Add Vendor Button - Aligned to Bottom Right */}
                    <div className="button-container">
                    <button onClick={() => navigate("/new-vendor")} className="vendor-btn">
                        Add Vendor
                    </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vendor;
