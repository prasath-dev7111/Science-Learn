const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { auth, JWT_SECRET } = require("../middleware/auth");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = new User({ email, password });
    await user.save();

    res.status(201).json({ message: "Account created successfully ✅" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Demo account support (no DB needed for demo)
    if (email === "demo@scilearn.com" && password === "demo123") {
      const token = jwt.sign({ id: "demo", email, role: "user" }, JWT_SECRET, { expiresIn: "7d" });
      return res.json({ message: "Login successful ✅", email, token, isAdmin: false });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful ✅",
      email: user.email,
      token,
      isAdmin: user.role === "admin"
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET current user profile (protected)
router.get("/me", auth, async (req, res) => {
  try {
    if (req.user.id === "demo") {
      return res.json({ email: req.user.email, role: "user", progress: {}, quizScores: {} });
    }
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// SAVE progress (protected)
router.post("/progress", auth, async (req, res) => {
  try {
    if (req.user.id === "demo") return res.json({ message: "Demo mode - progress not saved to DB" });
    const { subject, topic } = req.body;
    const key = `${subject}-${topic}`;
    await User.findByIdAndUpdate(req.user.id, {
      $set: { [`progress.${key}`]: true }
    });
    res.json({ message: "Progress saved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// SAVE quiz score (protected)
router.post("/quiz-score", auth, async (req, res) => {
  try {
    if (req.user.id === "demo") return res.json({ message: "Demo mode" });
    const { subject, topic, score, total } = req.body;
    const key = `${subject}-${topic}`;
    await User.findByIdAndUpdate(req.user.id, {
      $set: {
        [`quizScores.${key}`]: { score, total, date: new Date() }
      }
    });
    res.json({ message: "Score saved" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET all users (admin only)
router.get("/users", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const users = await User.find().select("-password");
  res.json(users);
});

module.exports = router;
