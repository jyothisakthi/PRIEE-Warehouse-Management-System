import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/newpurchase.css";

const NewPurchaseOrder = ({ onBack }) => {
    const [vendors, setVendors] = useState([]);
    const [itemsList, setItemsList] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState("");
    const [address, setAddress] = useState("");
    const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("PO-00001");
    const [orderDate, setOrderDate] = useState(new Date().toISOString().split("T")[0]);
    const [deliveryDate, setDeliveryDate] = useState("");

    const [items, setItems] = useState([{ itemName: "", quantity: 1, rate: 0, amount: 0 }]);
    const [discountType, setDiscountType] = useState("percent");
    const [discountValue, setDiscountValue] = useState(0);

    const handleVendorChange = (e) => {
        const vendorName = e.target.value;
        setSelectedVendor(vendorName);
        const vendorDetails = vendors.find((vendor) => vendor.name === vendorName);
        setAddress(vendorDetails ? vendorDetails.address : "");
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;

        if (field === "itemName") {
            const selectedItem = itemsList.find((item) => item.name === value);
            newItems[index].rate = selectedItem ? selectedItem.rate : 0;
        }

        if (field === "quantity") {
            newItems[index].quantity = Math.max(1, parseInt(value) || 1);
        }

        newItems[index].amount = (newItems[index].quantity * newItems[index].rate).toFixed(2);
        setItems(newItems);
    };

    const addItemRow = () => {
        setItems([...items, { itemName: "", quantity: 1, rate: 0, amount: 0 }]);
    };

    const deleteItemRow = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + parseFloat(item.amount), 0);

    // Calculate grand total after discount
    const calculateGrandTotal = () => {
        let discountAmount = 0;

        if (discountType === "percent") {
            discountAmount = (subtotal * discountValue) / 100;
        } else {
            discountAmount = discountValue;
        }

        return (subtotal - discountAmount).toFixed(2);
    };

    return (
        <div className="right-pane">
            <h2 className="mb-4">New Purchase Order</h2>
            <form className="p-4 rounded bg-light">
                <div className="mb-3">
                    <label htmlFor="vendor" className="form-label">Vendor Name:</label>
                    <select
                        id="vendor"
                        className="form-select"
                        value={selectedVendor}
                        onChange={handleVendorChange}
                        required
                    >
                        <option value="">Select Vendor</option>
                        {vendors.map((vendor, index) => (
                            <option key={index} value={vendor.name}>{vendor.name}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address:</label>
                    <input type="text" id="address" className="form-control" value={address} readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="poNumber" className="form-label">Purchase Order Number:</label>
                    <input type="text" id="poNumber" className="form-control" value={purchaseOrderNumber} readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="orderDate" className="form-label">Order Date:</label>
                    <input type="date" id="orderDate" className="form-control" value={orderDate} readOnly />
                </div>

                <div className="mb-3">
                    <label htmlFor="deliveryDate" className="form-label">Delivery Date:</label>
                    <input
                        type="date"
                        id="deliveryDate"
                        className="form-control"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        required
                    />
                </div>

                <h5 className="mt-4">Item Table</h5>
                <table className="table table-bordered mt-2">
                    <thead className="table-light">
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <select
                                        className="form-select"
                                        value={item.itemName}
                                        onChange={(e) => handleItemChange(index, "itemName", e.target.value)}
                                        required
                                    >
                                        <option value="">Select Item</option>
                                        {itemsList.map((item, i) => (
                                            <option key={i} value={item.name}>{item.name}</option>
                                        ))}
                                    </select>
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.quantity}
                                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                                        min="1"
                                        required
                                    />
                                </td>

                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={item.rate}
                                        onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                                        required
                                    />
                                </td>

                                <td>
                                    <input type="text" className="form-control" value={item.amount} readOnly />
                                </td>

                                <td>
                                    <button type="button" className="btn btn-danger" onClick={() => deleteItemRow(index)}>❌</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="d-flex justify-content-between align-items-center mt-3">
                    <button type="button" className="btn btn-success" onClick={addItemRow}>
                        + Add Item
                    </button>

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
                    <button type="submit" className="btn btn-primary">Create Purchase Order</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={onBack}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default NewPurchaseOrder;
