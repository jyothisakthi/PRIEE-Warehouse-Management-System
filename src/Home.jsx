import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaShoppingCart, FaMoneyBillWave, FaChartBar, FaBell, FaSearch } from "react-icons/fa"; 
import { MdExpandMore, MdExpandLess } from "react-icons/md"; 
import "./home.css";
import TopSellingProducts from "./components/TopSellingProducts";


const Home = () => {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState({
        inventory: false,
        sales: false,
        payments: false,
    });
    const [dashboardData, setDashboardData] = useState({
        toBePacked: 0,
        toBeShipped: 0,
        toBeDelivered: 0,
        toBeInvoiced: 0,
        quantityInHand: 0,
        quantityToBeReceived: 0,
    });

    useEffect(() => {
        fetch("/api/dashboard")
            .then(response => response.json())
            .then(data => setDashboardData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const toggleMenu = (menu) => {
        setOpenMenu((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    return (
        <div className="home-container">
            {/* Navbar */}
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

            {/* Main Layout */}
            <div className="main-container">
                {/* Left Pane */}
                <div className="left-pane">
                    <ul>
                        <li><FaHome className="menu-icon" /> Home</li>

                        {/* Inventory Section */}
                        <li onClick={() => toggleMenu("inventory")}> 
                            <FaBox className="menu-icon" /> Inventory {openMenu.inventory ? <MdExpandLess /> : <MdExpandMore />}
                        </li>
                        {openMenu.inventory && (
                            <ul className="submenu">
                                <li>   Items</li>
                                <li>   Item Group</li>
                            </ul>
                        )}

                        {/* Sales Section */}
                        <li onClick={() => toggleMenu("sales")}> 
                            <FaShoppingCart className="menu-icon" /> Sales {openMenu.sales ? <MdExpandLess /> : <MdExpandMore />}
                        </li>
                        {openMenu.sales && (
                            <ul className="submenu">
                                <li>   Customers</li>
                                <li>   Sales Orders</li>
                                <li>   Packages</li>
                                <li>   Shipments</li>
                                <li>   Invoices</li>
                                <li>   Payments Received</li>
                                <li>   Sales Return</li>
                            </ul>
                        )}

                        {/* Payments Section */}
                        <li onClick={() => toggleMenu("payments")}> 
                            <FaMoneyBillWave className="menu-icon" /> Payments {openMenu.payments ? <MdExpandLess /> : <MdExpandMore />}
                        </li>
                        {openMenu.payments && (
                            <ul className="submenu">
                                <li>   Vendors</li>
                                <li>   Purchase Orders</li>
                                <li>   Purchase Receives</li>
                                <li>   Bills</li>
                                <li>   Payments Made</li>
                            </ul>
                        )}
                        
                        <li><FaChartBar className="menu-icon" /> Reports</li>
                    </ul>
                </div>

                {/* Right Pane */}
                <div className="right-pane">
                    <div className="dashboard-container">
                        {/* Sales Activity Table */}
                        <div className="sales-activity">
                            <h3>Sales Activity</h3>
                            <div className="sales-content">
                                <div className="sales-item">
                                    <span className="sales-number blue">{dashboardData.toBePacked}</span>
                                    <span>Qty</span>
                                    <p>🔘 TO BE PACKED</p>
                                </div>
                                <div className="sales-item">
                                    <span className="sales-number red">{dashboardData.toBeShipped}</span>
                                    <span>Pkgs</span>
                                    <p>🔘 TO BE SHIPPED</p>
                                </div>
                                <div className="sales-item">
                                    <span className="sales-number green">{dashboardData.toBeDelivered}</span>
                                    <span>Pkgs</span>
                                    <p>🔘 TO BE DELIVERED</p>
                                </div>
                                <div className="sales-item">
                                    <span className="sales-number yellow">{dashboardData.toBeInvoiced}</span>
                                    <span>Qty</span>
                                    <p>🔘 TO BE INVOICED</p>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Summary Table */}
                        <div className="inventory-summary">
                            <h3>Inventory Summary</h3>
                            <div className="inventory-content">
                                <p>QUANTITY IN HAND <span className="bold">{dashboardData.quantityInHand}</span></p>
                                <hr />
                                <p>QUANTITY TO BE RECEIVED <span className="bold">{dashboardData.quantityToBeReceived}</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Additional Tables Below */}
                    <div className="additional-tables-container">
    {/* Inventory Table */}
    <div className="inventory-section">
        <table className="inventory-table">
            <tr>
                <th>Category</th>
                <th>Count</th>
                <th>Stock Overview</th>  
            </tr>
            <tr>
                <td>Low Stock Items</td>
                <td><span id="lowStock">0</span></td>
                <td rowSpan="3" className="chart-cell">
                    <div className="chart-container">
                        <div className="hollow-circle">
                            <span className="percentage">0%</span>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>All Item Groups</td>
                <td><span id="itemGroups">0</span></td>
            </tr>
            <tr>
                <td>All Items</td>
                <td><span id="allItems">0</span></td>
            </tr>
        </table>
    </div>

    {/* Top Selling Products Section */}
    <TopSellingProducts />

</div>



                </div>
            </div>
        </div>
    );
};

export default Home;
