import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./components/login";
import Signup from "./components/signup";
import Vendor from "./components/Vendor";
import NewVendor from "./components/NewVendor";
import PurchaseOrder from "./components/purchaseorder";
import NewPurchaseOrder from "./components/newpurchaseorder";
import CustomerPage from "./components/CustomerPage";
import NewCustomer from "./components/NewCustomer";
import NewSalesOrder from "./components/NewSalesOrder";
import ItemPage from "./components/ItemPage";
import NewItemGroup from "./components/NewItemGroup";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/new-vendor" element={<NewVendor />} />      
        <Route path="/purchaseorder" element={<PurchaseOrder />} />
        <Route path="/newpurchaseorder" element={<NewPurchaseOrder />} />
        <Route path="/CustomerPage" element={<CustomerPage />} />
        <Route path="/new-customer" element={<NewCustomer />} />
        <Route path="/new-sales-order" element={<NewSalesOrder />} />
        <Route path="/ItemPage" element={<ItemPage />} />
        <Route path="/NewItemGroup" element={<NewItemGroup />} />
        <Route path="/itemPageRoute" element={<ItemPage />} />

      </Routes>
    </Router>
  );
}

export default App;