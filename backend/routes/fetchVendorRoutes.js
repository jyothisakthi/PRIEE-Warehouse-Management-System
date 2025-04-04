const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

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