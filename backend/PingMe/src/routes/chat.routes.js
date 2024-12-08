const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

router.post('/start', chatController.startChat);
router.post('/message', chatController.sendMessage);
router.get('/history', chatController.getChatHistory);

module.exports = router;