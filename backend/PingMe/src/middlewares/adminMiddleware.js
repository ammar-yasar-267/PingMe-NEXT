const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const adminAuth = async (req, res, next) => {
  // Get token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // If there's no token, return an error
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the admin by decoded ID
    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(403).json({ message: "Access denied. Invalid credentials." });
    }

    // Check if the user is an admin or superadmin
    // You can modify this check depending on your needs
    if (admin.role !== "admin" && admin.role !== "superadmin") {
      return res.status(403).json({ message: "Access denied. Invalid credentials." });
    }

    // Attach the admin object to the request for use in further middleware or route handlers
    req.admin = admin;
    
    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = adminAuth;
