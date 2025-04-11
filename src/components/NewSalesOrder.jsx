import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/newsales.css";

import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const NewSalesOrder = ({ onBack }) => {
    const [customers, setCustomers] = useState([]);
    const [productsList, setProductsList] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");
    const [address, setAddress] = useState("");
    const [salesOrderNumber, setSalesOrderNumber] = useState("SO-00001");
    const [orderDate, setOrderDate] = useState(new Date().toISOString().split("T")[0]);
    const [deliveryDate, setDeliveryDate] = useState("");

    const [products, setProducts] = useState([{ productName: "", quantity: 1, rate: 0, amount: 0 }]);
    const [discountType, setDiscountType] = useState("percent");
    const [discountValue, setDiscountValue] = useState(0);
    const [showCustomerList, setShowCustomerList] = useState(false);

    useEffect(() => {
        // This should be replaced with real fetch logic from backend
        // Dummy data for now
        setCustomers([
            { name: "ABC Corp", address: "123 Main St, City A" },
            { name: "XYZ Traders", address: "456 Market Rd, City B" },
        ]);
        setProductsList([
            { name: "Product A", rate: 100 },
            { name: "Product B", rate: 200 },
        ]);
    }, []);

    const handleCustomerChange = (e) => {
        const customerName = e.target.value;
        setSelectedCustomer(customerName);
        const customerDetails = customers.find((c) => c.name === customerName);
        setAddress(customerDetails ? customerDetails.address : "");
    };

    const handleProductChange = (index, field, value) => {
        const newProducts = [...products];
        newProducts[index][field] = value;

        if (field === "productName") {
            const selectedProduct = productsList.find((p) => p.name === value);
            newProducts[index].rate = selectedProduct ? selectedProduct.rate : 0;
        }

        if (field === "quantity") {
            newProducts[index].quantity = Math.max(1, parseInt(value) || 1);
        }

        newProducts[index].amount = (newProducts[index].quantity * newProducts[index].rate).toFixed(2);
        setProducts(newProducts);
    };

    const addProductRow = () => {
        setProducts([...products, { productName: "", quantity: 1, rate: 0, amount: 0 }]);
    };

    const deleteProductRow = (index) => {
        setProducts(products.filter((_, i) => i !== index));
    };

    const subtotal = products.reduce((sum, item) => sum + parseFloat(item.amount), 0);

    const calculateGrandTotal = () => {
        let discountAmount = discountType === "percent"
            ? (subtotal * discountValue) / 100
            : discountValue;
        return (subtotal - discountAmount).toFixed(2);
    };

    return (
        <div className="home-container">
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="right-pane">
                <div className="row align-items-center mb-4">
  <div className="col">
    <h2 className="mb-0">New Sales Order</h2>
  </div>
  <div className="col-auto text-end">
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => setShowCustomerList(!showCustomerList)}
    >
      {showCustomerList ? "Hide" : "View"} Existing Customers
    </button>
  </div>
</div>



                    <form className="p-4 rounded bg-light">
                        <div className="mb-3">
                            <label className="form-label">Customer Name:</label>
                            <select className="form-select" value={selectedCustomer} onChange={handleCustomerChange} required>
                                <option value="">Select Customer</option>
                                {customers.map((customer, index) => (
                                    <option key={index} value={customer.name}>{customer.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Address:</label>
                            <input type="text" className="form-control" value={address} readOnly />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Sales Order Number:</label>
                            <input type="text" className="form-control" value={salesOrderNumber} readOnly />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Order Date:</label>
                            <input type="date" className="form-control" value={orderDate} readOnly />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Delivery Date:</label>
                            <input type="date" className="form-control" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} required />
                        </div>

                        <h5 className="mt-4">Product Table</h5>
                        <table className="table table-bordered mt-2">
                            <thead className="table-light">
                                <tr>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Rate</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index}>
                                        <td>
                                            <select
                                                className="form-select"
                                                value={product.productName}
                                                onChange={(e) => handleProductChange(index, "productName", e.target.value)}
                                                required
                                            >
                                                <option value="">Select Product</option>
                                                {productsList.map((p, i) => (
                                                    <option key={i} value={p.name}>{p.name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={product.quantity}
                                                onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                                                min="1"
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="form-control"
                                                value={product.rate}
                                                onChange={(e) => handleProductChange(index, "rate", e.target.value)}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <input type="text" className="form-control" value={product.amount} readOnly />
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-danger" onClick={() => deleteProductRow(index)}>❌</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="d-flex justify-content-between align-items-center mt-3">
                            <button type="button" className="btn btn-success" onClick={addProductRow}>+ Add Product</button>

                            <div className="border p-3 bg-white shadow-sm rounded">
                                <div className="mb-2">
                                    <strong>Subtotal:</strong> ₹{subtotal.toFixed(2)}
                                </div>
                                <div className="mb-2">
                                    <label className="form-label me-2">Discount:</label>
                                    <select className="form-select d-inline w-auto" value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
                                        <option value="percent">%</option>
                                        <option value="amount">₹</option>
                                    </select>
                                    <input
                                        type="number"
                                        className="form-control d-inline w-auto ms-2"
                                        value={discountValue}
                                        onChange={(e) => setDiscountValue(parseFloat(e.target.value) || 0)}
                                        min="0"
                                    />
                                </div>
                                <div className="mt-2">
                                    <strong>Grand Total:</strong> ₹{calculateGrandTotal()}
                                </div>
                            </div>
                        </div>

                        <div className="button-group mt-4">
                            <button type="submit" className="btn btn-primary">Create Sales Order</button>
                            <button type="button" className="btn btn-secondary ms-2" onClick={onBack}>Cancel</button>
                        </div>
                    </form>

                    {/* Existing Customers Section */}
                    {showCustomerList && (
                        <div className="mt-4 p-3 border bg-white rounded shadow-sm">
                            <h5>Existing Customers</h5>
                            <ul className="list-group">
                                {customers.length > 0 ? (
                                    customers.map((customer, index) => (
                                        <li key={index} className="list-group-item">
                                            <strong>{customer.name}</strong><br />
                                            <small>{customer.address}</small>
                                        </li>
                                    ))
                                ) : (
                                    <li className="list-group-item">No customers available.</li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewSalesOrder;
