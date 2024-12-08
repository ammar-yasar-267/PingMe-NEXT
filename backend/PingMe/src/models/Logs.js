const mongoose = require("mongoose");

const logsSchema = new mongoose.Schema({
  action: { type: String, required: true },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Logs", logsSchema);
