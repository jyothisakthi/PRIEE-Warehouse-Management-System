import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import "../styles/Customer.css";

const NewCustomer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        customerType: "Individual",
        salutation: "",
        firstName: "",
        lastName: "",
        companyName: "",
        displayName: "",
        email: "",
        phone: "",
        country: "",
        street1: "",
        street2: "",
        city: "",
        state: "",
        pinCode: "",
        addressPhone: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted Customer:", formData);
        navigate("/customer");
    };

    return (
        <div className="home-container d-flex flex-column vh-100">
            <Navbar />
            <div className="main-container d-flex flex-grow-1">
                <Sidebar />
                <div className="right-pane">
                    <h2 style={{ marginBottom: "20px" }}>Add New Customer</h2>
                    <form className="vendor-form" onSubmit={handleSubmit}>
                        {/* Customer Info Section */}
                        <div className="form-group">
                            <label>Customer Type</label>
                            <select name="customerType" value={formData.customerType} onChange={handleChange}>
                                <option value="Business">Business</option>
                                <option value="Individual">Individual</option>
                            </select>
                        </div>

                        <div className="primary-contact">
                            <div className="form-group">
                                <label>Salutation</label>
                                <input type="text" name="salutation" value={formData.salutation} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="primary-contact">
                            <div className="form-group">
                                <label>Company Name</label>
                                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Display Name</label>
                                <input type="text" name="displayName" value={formData.displayName} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="primary-contact">
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="form-group">
                                <label>Phone</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Address Section */}
                        <h4>Address</h4>

                        <div className="primary-contact">
                            <div className="form-group">
                                <label>Country/Region</label>
                                <input type="text" name="country" value={formData.country} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Street 1</label>
                                <input type="text" name="street1" value={formData.street1} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Street 2</label>
                                <input type="text" name="street2" value={formData.street2} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="primary-contact">
                            <div className="form-group">
                                <label>City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>State</label>
                                <input type="text" name="state" value={formData.state} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Pin Code</label>
                                <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Phone</label>
                            <input type="text" name="addressPhone" value={formData.addressPhone} onChange={handleChange} />
                        </div>

                        <div className="button-group">
                            <button type="submit" className="save-btn">Save</button>
                            <button type="button" className="cancel-btn" onClick={() => navigate("/customer")}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewCustomer;
