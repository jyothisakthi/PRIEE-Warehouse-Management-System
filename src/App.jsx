import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home";
import Login from "./components/login";
import Signup from "./components/signup";
import Vendor from "./components/Vendor";
import NewVendor from "./components/NewVendor";

import PurchaseOrder from "./components/purchaseorder";
import NewPurchaseOrder from "./components/newpurchaseorder";

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
      </Routes>
    </Router>
  );
}

export default App;
