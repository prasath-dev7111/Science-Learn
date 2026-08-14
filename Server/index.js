const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/auth");

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "SciLearn Server Running 🚀" });
});

// Connect MongoDB & Start
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/scienceApp";
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    // Start server anyway (app still works with localStorage)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (no DB)`);
    });
  });
