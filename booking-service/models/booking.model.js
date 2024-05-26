const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema', required: true },
  showtime: { type: Date, required: true },
  seats: [{ type: Number, required: true }],
  paymentConfirmed: { type: Boolean, default: false },
  paymentPending: { type: Boolean, default: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;