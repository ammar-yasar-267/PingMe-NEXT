const express = require('express');
const router = express.Router();
const { checkRole } = require('../middleware/role.middleware');
const analyticsController = require('../controllers/analytics.controller');

router.get('/bot/:botId', checkRole('botMaker'), analyticsController.getBotAnalytics);
router.get('/user', analyticsController.getUserAnalytics);

module.exports = router;