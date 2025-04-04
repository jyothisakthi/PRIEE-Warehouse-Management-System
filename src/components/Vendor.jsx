import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchVendors } from "../services/api"; // Importing the API function
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "../styles/Vendor.css";

const Vendor = () => {
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getVendors = async () => {
            try {
                const response = await fetchVendors();
                setVendors(response.data);
            } catch (err) {
                setError("Failed to load vendors");
            } finally {
                setLoading(false);
            }
        };
        getVendors();
    }, []);

    return (
        <div className="home-container">
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="right-pane">
                    <h2>Vendors</h2>

                    {loading ? (
                        <p>Loading vendors...</p>
                    ) : error ? (
                        <p className="error-message">{error}</p>
                    ) : vendors.length === 0 ? (
                        <span className="vendor-message">No Vendors</span>
                    ) : (
                        <table className="vendor-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Company Name</th>
                                    <th>Email</th>
                                    <th>Work Phone</th>
                                    <th>Payables</th>
                                    <th>Unused Credit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.map((vendor, index) => (
                                    <tr key={index}>
                                        <td>{vendor.firstName} {vendor.lastName}</td>
                                        <td>{vendor.companyName || "N/A"}</td>
                                        <td>{vendor.email || "N/A"}</td>
                                        <td>{vendor.phone || "N/A"}</td>
                                        <td>₹{vendor.payables?.toFixed(2) || "0.00"}</td>
                                        <td>₹{vendor.unusedCredit?.toFixed(2) || "0.00"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Add Vendor Button - Positioned Bottom Right */}
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
