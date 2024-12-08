const express = require("express");
const jwt = require("jsonwebtoken");
const {
  loginAdmin,
  manageUsers,
  updateUser,
  deleteUser,
  updateBotStatus,
  fetchAnalytics,
  addAdmin,
  fetchDashboardSummary,
  fetchChatRooms,
  deleteChatRoom,
} = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminMiddleware");
const Admin = require("../models/Admin");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// Temporary Login (Bypass Password Validation)
router.post("/temp-login", async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    // Generate a token for the admin
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Temporary login successful. Please create a new admin and remove this route.",
      token,
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Error during temporary login", error: error.message });
  }
});

// Admin Login
router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    loginAdmin(req, res);
  }
);

// Add New Admin
router.post(
  "/add-admin",
  [
    adminAuth,
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Valid email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    addAdmin(req, res);
  }
);

// Manage Users
router.get("/users", adminAuth, manageUsers);

// Update User
router.put("/update-user", adminAuth, updateUser);

// Delete User
router.delete("/delete-user/:userId", adminAuth, deleteUser);

// Approve/Reject Bots
router.patch("/bots", adminAuth, updateBotStatus);

// Fetch Analytics
router.get("/analytics", adminAuth, fetchAnalytics);

// Fetch Dashboard Summary
router.get("/dashboard-summary", adminAuth, fetchDashboardSummary);

// Fetch Chat Rooms
router.get("/chat-rooms", adminAuth, fetchChatRooms);

// Delete Chat Room
router.delete("/delete-chat-room/:chatRoomId", adminAuth, deleteChatRoom);

module.exports = router;
