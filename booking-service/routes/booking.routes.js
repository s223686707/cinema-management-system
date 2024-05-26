const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Test route for POST request
router.post('/test', (req, res) => {
    res.json({ message: 'Test route is working', data: req.body });
  });

// Get all bookings
router.get('/', authMiddleware("admin"), bookingController.getBookings);

// Get a single booking
router.get('/:id', authMiddleware("admin"), bookingController.getBookingById);

// Create a new booking
router.post('/', authMiddleware("admin"), bookingController.createBooking);

// Confirm payment for a booking
router.post('/confirm-payment', authMiddleware("admin"), bookingController.confirmPayment);

// Update a booking
router.put('/:id', authMiddleware("admin"), bookingController.updateBooking);

// Cancel a booking
router.delete('/:id', authMiddleware("admin"), bookingController.cancelBooking);

module.exports = router;