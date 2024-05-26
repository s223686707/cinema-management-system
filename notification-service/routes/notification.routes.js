const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Send a notification
router.post('/', authMiddleware("admin"), notificationController.sendNotification);

module.exports = router;