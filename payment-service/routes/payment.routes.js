const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Manually confirm a payment
router.post('/manual-confirm', authMiddleware("admin"), paymentController.manualConfirmPayment);

module.exports = router;