import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "../styles/Customer.css";

const CustomerPage = () => {
    const navigate = useNavigate();

    // Dummy customer list (Replace this with MongoDB data fetching later)
    const [customers, setCustomers] = useState([]);

    return (
        <div className="home-container">
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="right-pane">
                    <div className="customer-list">
                        {customers.length === 0 ? (
                            <span className="customer-message">No Customers</span>
                        ) : (
                            <ul>
                                {customers.map((customer, index) => (
                                    <li key={index} className="customer-item">
                                        {customer.name} - {customer.email}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Add Customer Button - Aligned to Bottom Right */}
                    <div className="button-container">
                        <button onClick={() => navigate("/new-customer")} className="customer-btn">
                            Add Customer
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerPage;
