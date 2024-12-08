const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" }, // Ensures only admins can access admin routes
}, { timestamps: true });

module.exports = mongoose.model("Admin", adminSchema);
