const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

// Add a new vendor
router.post("/add", async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    await newVendor.save();
    res.status(201).json({ message: "Vendor added successfully", vendor: newVendor });
  } catch (error) {
    console.error("Error adding vendor:", error);
    res.status(500).json({ message: "Failed to add vendor", error });
  }
});

// Fetch all vendors
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching vendors", error: err.message });
  }
});

module.exports = router;
