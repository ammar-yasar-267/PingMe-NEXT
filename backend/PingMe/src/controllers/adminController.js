const Bot = require("../models/Bot");
const User = require("../models/User");
const Chat = require("../models/Chat");
const ChatRoom = require("../models/ChatRoom");
const Admin = require("../models/Admin");
const Logs = require("../models/Logs");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// JWT Token Generator
const generateToken = (admin) => {
  return jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(admin);
    res.status(200).json({ token, admin });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// Add New Admin
const addAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, password: hashedPassword, role });
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully", newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error: error.message });
  }
};

// Manage Users (List All)
const manageUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  const { userId, updates } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error: error.message });
  }
};

// Approve/Reject Bots
const updateBotStatus = async (req, res) => {
  const { botId, status } = req.body;
  try {
    const bot = await Bot.findByIdAndUpdate(botId, { status }, { new: true });
    if (!bot) return res.status(404).json({ message: "Bot not found" });

    // Notify Developer
    const developer = await User.findById(bot.developer);
    if (developer) {
      await notifyDeveloper(developer.email, bot.name, status);
    }

    res.status(200).json({ message: "Bot status updated successfully", bot });
  } catch (error) {
    res.status(500).json({ message: "Error updating bot status", error: error.message });
  }
};

// Notify Developer
const notifyDeveloper = async (email, botName, status) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASSWORD },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Bot Status Update",
    text: `Your bot "${botName}" has been ${status}.`,
  };

  await transporter.sendMail(mailOptions);
};

// Fetch Bot Analytics
const fetchBotAnalytics = async (req, res) => {
  try {
    const activeBots = await Bot.find({ status: "active" }).countDocuments();
    const inactiveBots = await Bot.find({ status: "inactive" }).countDocuments();

    res.status(200).json({ activeBots, inactiveBots });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bot analytics", error: error.message });
  }
};

// Fetch Analytics for Admin Dashboard
const fetchAnalytics = async (req, res) => {
  try {
    const botStats = await fetchBotAnalytics();
    const userStats = await User.aggregate([
      { $group: { _id: "$role", count: { $sum: 1 } } },
    ]);

    res.status(200).json({ botStats, userStats });
  } catch (error) {
    res.status(500).json({ message: "Error fetching analytics", error: error.message });
  }
};



// Fetch Dashboard Summary
const fetchDashboardSummary = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBots = await Bot.countDocuments();
    const totalChatRooms = await ChatRoom.countDocuments();

    res.status(200).json({ totalUsers, totalBots, totalChatRooms });
  } catch (error) {
    res.status(500).json({ message: "Error fetching summary", error: error.message });
  }
};

// Fetch and Delete Chat Rooms
const fetchChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find().populate("participants");
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chat rooms", error: error.message });
  }
};

const deleteChatRoom = async (req, res) => {
  const { chatRoomId } = req.params;
  try {
    const deletedRoom = await ChatRoom.findByIdAndDelete(chatRoomId);
    if (!deletedRoom) return res.status(404).json({ message: "Chat room not found" });

    res.status(200).json({ message: "Chat room deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting chat room", error: error.message });
  }
};

module.exports = {
  loginAdmin,
  addAdmin,
  manageUsers,
  updateUser,
  deleteUser,
  updateBotStatus,
  fetchBotAnalytics,
  fetchDashboardSummary,
  fetchChatRooms,
  deleteChatRoom,
  fetchAnalytics
};

