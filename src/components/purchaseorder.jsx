import React, { useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import NewPurchaseOrder from "./newpurchaseorder";
import "../styles/Vendor.css";

const PurchaseOrder = () => {
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [showNewOrderForm, setShowNewOrderForm] = useState(false);

    return (
        <div className="home-container">
            <Navbar />
            <div className="main-container">
                <Sidebar />
                <div className="right-pane">
                    {showNewOrderForm ? (
                        <NewPurchaseOrder onBack={() => setShowNewOrderForm(false)} />
                    ) : (
                        <>
                            <div className="purchase-order-list">
                                {purchaseOrders.length === 0 ? (
                                    <span className="purchase-order-message">No Purchase Orders</span>
                                ) : (
                                    <ul>
                                        {purchaseOrders.map((order, index) => (
                                            <li key={index} className="purchase-order-item">
                                                <span>{order}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            <div className="button-container">
                                <button onClick={() => setShowNewOrderForm(true)} className="purchase-order-btn">
                                    Add Purchase Order
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PurchaseOrder;
