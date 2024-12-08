const Logs = require("../models/Logs");

const fetchLogs = async (req, res) => {
  try {
    const logs = await Logs.find().sort({ createdAt: -1 });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching logs", error: error.message });
  }
};

const addLog = async (req, res) => {
  const { action, performedBy } = req.body;
  try {
    const newLog = new Logs({ action, performedBy });
    await newLog.save();

    res.status(201).json({ message: "Log added successfully", newLog });
  } catch (error) {
    res.status(500).json({ message: "Error adding log", error: error.message });
  }
};

module.exports = {
  fetchLogs,
  addLog,
};
