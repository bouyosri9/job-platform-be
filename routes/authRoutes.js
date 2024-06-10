const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Authenticate user
router.post("/login", authUser);

// Get user profile (protected route)
router.get("/profile", protect, getUserProfile);

module.exports = router;
