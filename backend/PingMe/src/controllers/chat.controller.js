const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chat = require('../models/chat.model');
const Bot = require('../models/bot.model');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.startChat = async (req, res) => {
  try {
    const { botId } = req.body;
    const bot = await Bot.findById(botId);
    if (!bot) {
      return res.status(404).json({ message: 'Bot not found' });
    }

    const chat = new Chat({
      user: req.user._id,
      bot: botId,
      messages: []
    });

    await chat.save();
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { chatId, message } = req.body;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    const bot = await Bot.findById(chat.bot);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Add user message
    chat.messages.push({
      sender: 'user',
      content: message
    });

    // Generate bot response
    const prompt = `${bot.trainingData}\n\nUser: ${message}\nBot:`;
    const result = await model.generateContent(prompt);
    const botResponse = result.response.text();

    // Add bot response
    chat.messages.push({
      sender: 'bot',
      content: botResponse
    });

    await chat.save();
    res.json(chat);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user._id })
      .populate('bot', 'name')
      .sort('-startedAt');
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};