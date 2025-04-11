import React, { useState } from "react";
import { FaHome, FaBox, FaShoppingCart, FaMoneyBillWave, FaChartBar } from "react-icons/fa";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./home.css";
import "@fortawesome/fontawesome-free/css/all.min.css";



const Sidebar = () => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState({
        inventory: false,
        sales: false,
        payments: false,
    });

    const toggleMenu = (menu) => {
        setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    return (
        <div className="left-pane">
            <ul>
                <li onClick={() => navigate("/")}>
                    <FaHome className="menu-icon" /> Home
                </li>

                {/* Inventory Section */}
                <li onClick={() => toggleMenu("inventory")}>
                    <FaBox className="menu-icon" /> Inventory {openMenu.inventory ? <MdExpandLess /> : <MdExpandMore />}
                </li>
                {openMenu.inventory && (
                    <ul className="submenu">
                        <li>Items</li>
                        <li>Item Group</li>
                    </ul>
                )}

                {/* Sales Section */}
                <li onClick={() => toggleMenu("sales")}>
                    <FaShoppingCart className="menu-icon" /> Sales {openMenu.sales ? <MdExpandLess /> : <MdExpandMore />}
                </li>
                {openMenu.sales && (
                    <ul className="submenu">
                        <li onClick={() => navigate("/CustomerPage")}>Customers</li>
                        <li onClick={() => navigate("/new-sales-order")}>Sales Orders</li>
                        <li>Packages</li>
                        <li>Shipments</li>
                        <li>Invoices</li>
                        <li>Payments Received</li>
                        <li>Sales Return</li>
                    </ul>
                )}

                {/* Payments Section */}
                <li onClick={() => toggleMenu("payments")}>
                    <FaMoneyBillWave className="menu-icon" /> Payments {openMenu.payments ? <MdExpandLess /> : <MdExpandMore />}
                </li>
                {openMenu.payments && (
                    <ul className="submenu">
                        <li onClick={() => navigate("/vendor")}> Vendor</li>

                        <li onClick={() => navigate("/purchaseorder")}>Purchase Orders</li>

                        <li>Purchase Receives</li>
                        <li>Bills</li>
                        <li>Payments Made</li>
                    </ul>
                )}

                <li><FaChartBar className="menu-icon" /> Reports</li>
            </ul>
        </div>
    );
};

export default Sidebar;
