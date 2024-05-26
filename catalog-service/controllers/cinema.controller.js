const Cinema = require('../models/cinema.model');

// Get all cinemas
exports.getCinemas = async (req, res) => {
  try {
    const cinemas = await Cinema.find();
    res.json(cinemas);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single cinema
exports.getCinemaById = async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) {
      return res.status(404).json({ message: 'Cinema not found' });
    }
    res.json(cinema);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new cinema
exports.createCinema = async (req, res) => {
  const cinema = new Cinema({
    name: req.body.name,
    location: req.body.location,
    screens: req.body.screens
  });

  try {
    const newCinema = await cinema.save();
    res.status(201).json(newCinema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a cinema
exports.updateCinema = async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) {
      return res.status(404).json({ message: 'Cinema not found' });
    }

    cinema.name = req.body.name || cinema.name;
    cinema.location = req.body.location || cinema.location;
    cinema.screens = req.body.screens || cinema.screens;

    const updatedCinema = await cinema.save();
    res.json(updatedCinema);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a cinema
exports.deleteCinema = async (req, res) => {
  try {
    const cinema = await Cinema.findById(req.params.id);
    if (!cinema) {
      return res.status(404).json({ message: 'Cinema not found' });
    }

    await cinema.remove();
    res.json({ message: 'Cinema deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};