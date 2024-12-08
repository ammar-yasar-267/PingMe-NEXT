const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const botRoutes = require('./routes/bot.routes');
const chatRoutes = require('./routes/chat.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const { errorHandler } = require('./middleware/error.middleware');
const { authMiddleware } = require('./middleware/auth.middleware');



const app = express();



// Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Basic middleware
app.use(express.json());
app.use(morgan('dev'));


// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bots', authMiddleware, botRoutes);
app.use('/api/chats', authMiddleware, chatRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);

// Error handling
app.use(errorHandler);

module.exports = app;
