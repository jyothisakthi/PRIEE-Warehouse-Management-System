const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.signup = async (req, res) => {
  try {
    const {
      companyName,
      companyAddress1,
      companyAddress2,
      companyAddress3,
      companyContact,
      fullName,
      email,
      phone,
      role,
      password,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      companyName,
      companyAddress1,
      companyAddress2,
      companyAddress3,
      companyContact,
      fullName,
      email,
      phone,
      role,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
