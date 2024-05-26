const mongoose = require('mongoose');

const cinemaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  screens: [{ type: Number, required: true }]
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;