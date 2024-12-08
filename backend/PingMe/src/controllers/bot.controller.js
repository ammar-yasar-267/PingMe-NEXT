const { GoogleGenerativeAI } = require('@google/generative-ai');
const Bot = require('../models/bot.model');
const { validateBotInput } = require('../utils/validators');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.createBot = async (req, res) => {
  try {
    const { name, description, trainingData, category } = req.body;
    
    if (!validateBotInput(name, description, trainingData)) {
      return res.status(400).json({ message: 'Invalid bot input data' });
    }

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Train the model with provided data
    const prompt = `You are a chatbot for: ${description}. 
                   Context: ${trainingData}. 
                   Remember this information for future conversations.`;
    
    await model.generateContent(prompt);

    const bot = new Bot({
      name,
      description,
      trainingData,
      category,
      creator: req.user._id
    });

    await bot.save();
    res.status(201).json(bot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllBots = async (req, res) => {
  try {
    const bots = await Bot.find({ isActive: true })
      .populate('creator', 'username')
      .sort('-createdAt');
    res.json(bots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBotById = async (req, res) => {
  try {
    const bot = await Bot.findById(req.params.id)
      .populate('creator', 'username');
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    res.json(bot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBot = async (req, res) => {
  try {
    const bot = await Bot.findById(req.params.id);
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    
    if (bot.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedBot = await Bot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBot = async (req, res) => {
  try {
    const bot = await Bot.findById(req.params.id);
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }
    
    if (bot.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Bot.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};