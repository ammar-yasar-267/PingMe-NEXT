const express = require('express');
const router = express.Router();
const { checkRole } = require('../middleware/role.middleware');
const botController = require('../controllers/bot.controller');

router.post('/', checkRole('botMaker'), botController.createBot);
router.get('/', botController.getAllBots);
router.get('/:id', botController.getBotById);
router.put('/:id', checkRole('botMaker'), botController.updateBot);
router.delete('/:id', checkRole('botMaker'), botController.deleteBot);

module.exports = router;