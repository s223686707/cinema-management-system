const express = require('express');
const router = express.Router();
const cinemaController = require('../controllers/cinema.controller');
const authMiddleware = require('../middleware/authMiddleware');

// Get all cinemas
router.get('/', authMiddleware('admin'), cinemaController.getCinemas);

// Get a single cinema
router.get('/:id', authMiddleware('admin'), cinemaController.getCinemaById);

// Create a new cinema
router.post('/', authMiddleware('admin'), cinemaController.createCinema);

// Update a cinema
router.put('/:id', authMiddleware('admin'), cinemaController.updateCinema);

// Delete a cinema
router.delete('/:id', authMiddleware('admin'), cinemaController.deleteCinema);

module.exports = router;