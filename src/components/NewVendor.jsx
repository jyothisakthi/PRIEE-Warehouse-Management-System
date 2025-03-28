import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "../styles/Vendor.css";

const NewVendor = () => {
    const navigate = useNavigate();
    const [vendorData, setVendorData] = useState({
        salutation: "",
        firstName: "",
        lastName: "",
        companyName: "",
        displayName: "",
        email: "",
        phone: "",
        pan: "",
        msme: false,
        country: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        billingPhone: "",
        accountHolder: "",
        bankName: "",
        accountNumber: "",
        reAccountNumber: "",
        ifsc: ""
    });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setVendorData({
            ...vendorData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        for (const key in vendorData) {
            if (!vendorData[key]) {
                setError("Please fill in all required fields.");
                return;
            }
        }
        
        if (vendorData.accountNumber !== vendorData.reAccountNumber) {
            setError("Account numbers do not match.");
            return;
        }
        setError("");
        console.log("Vendor Data:", vendorData);
        // Add API call here to save the vendor to MongoDB
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="right-pane">
                    <h2>New Vendor</h2>
                    <form className="vendor-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Primary Contact</label>
                            <div className="primary-contact">
                                <select name="salutation" value={vendorData.salutation} onChange={handleChange} required>
                                    <option value="">Salutation</option>
                                    <option value="Mr.">Mr.</option>
                                    <option value="Ms.">Ms.</option>
                                    <option value="Mrs.">Mrs.</option>
                                    <option value="Miss.">Miss.</option>
                                    <option value="Dr.">Dr.</option>
                                </select>
                                <input type="text" name="firstName" placeholder="First Name" value={vendorData.firstName} onChange={handleChange} required />
                                <input type="text" name="lastName" placeholder="Last Name" value={vendorData.lastName} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Company Name</label>
                            <input type="text" name="companyName" value={vendorData.companyName} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Display Name *</label>
                            <input type="text" name="displayName" value={vendorData.displayName} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" value={vendorData.email} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" name="phone" placeholder="Work Phone" value={vendorData.phone} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <label>PAN</label>
                            <input type="text" name="pan" value={vendorData.pan} onChange={handleChange} />
                        </div>

                        <div className="form-group">
                            <input type="checkbox" name="msme" checked={vendorData.msme} onChange={handleChange} />
                            <label>MSME Registered?</label>
                        </div>

                        <div className="form-group">
                            <label>Display Name *</label>
                            <input type="text" name="displayName" value={vendorData.displayName} onChange={handleChange} required />
                        </div>

                        <h3>Address (Billing or Shipping Address) *</h3>
                        <div className="form-group">
                            <label>Country/Region</label>
                            <input type="text" name="country" value={vendorData.country} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" name="address" value={vendorData.address} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" value={vendorData.city} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>State</label>
                            <input type="text" name="state" value={vendorData.state} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Pin Code</label>
                            <input type="text" name="pinCode" value={vendorData.pinCode} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" name="billingPhone" value={vendorData.billingPhone} onChange={handleChange} required />
                        </div>

                        <h3>Bank Details</h3>
                        <div className="form-group">
                            <label>Account Holder Name</label>
                            <input type="text" name="accountHolder" value={vendorData.accountHolder} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Bank Name</label>
                            <input type="text" name="bankName" value={vendorData.bankName} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Account Number *</label>
                            <input type="text" name="accountNumber" value={vendorData.accountNumber} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>Re-enter Account Number *</label>
                            <input type="text" name="reAccountNumber" value={vendorData.reAccountNumber} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>IFSC *</label>
                            <input type="text" name="ifsc" value={vendorData.ifsc} onChange={handleChange} required />
                        </div>

                        {error && <p className="error-message">{error}</p>}
                        <div className="button-group">
                            <button type="submit" className="save-btn">Save</button>
                            <button type="button" className="cancel-btn" onClick={() => navigate("/vendor")}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewVendor;