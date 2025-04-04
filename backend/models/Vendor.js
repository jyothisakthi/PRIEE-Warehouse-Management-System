const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  salutation: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  companyName: String,
  displayName: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  phone: String,
  pan: String,
  msme: { type: Boolean, default: false },
  country: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pinCode: { type: String, required: true },
  billingPhone: { type: String, required: true },
  accountHolder: { type: String, required: true },
  bankName: { type: String, required: true },
  accountNumber: { type: String, required: true },
  ifsc: { type: String, required: true },
  payables: { type: Number, default: 0 }, // Added this
  unusedCredit: { type: Number, default: 0 } // Added this
});

module.exports = mongoose.model("Vendor", vendorSchema);
