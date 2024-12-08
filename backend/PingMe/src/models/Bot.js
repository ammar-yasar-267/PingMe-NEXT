const mongoose = require("mongoose");

const botSchema = new mongoose.Schema({
  name: { type: String, required: true },
  developer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  analytics: { type: Object, default: {} },
}, { timestamps: true });

module.exports = mongoose.model("Bot", botSchema);
