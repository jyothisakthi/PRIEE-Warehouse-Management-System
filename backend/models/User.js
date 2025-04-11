const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  companyAddress1: { type: String, required: true },
  companyAddress2: String,
  companyAddress3: String,
  companyContact: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  role: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);