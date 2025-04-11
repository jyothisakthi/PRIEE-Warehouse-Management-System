import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaBox, FaShoppingCart, FaMoneyBillWave, FaChartBar, FaBell, FaSearch } from "react-icons/fa"; 
import { MdExpandMore, MdExpandLess } from "react-icons/md"; 
import "./home.css";
import TopSellingProducts from "./components/TopSellingProducts";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";


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
            <Navbar />

            {/* Main Layout */}
            <div className="main-container">
                {/* Left Pane */}
                <Sidebar />

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