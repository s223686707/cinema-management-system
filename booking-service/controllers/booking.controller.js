const Booking = require('../models/booking.model');
const axios = require('axios');

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single booking
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new booking
exports.createBooking = async (req, res) => {
    const { movieId, cinemaId, showtime, seats } = req.body;
    console.log('Request body:', req.body);
    const token = req.headers['authorization'];
  
    // Validate movie and cinema availability
    try {
      const movieResponse = await axios.get(`http://catalog-service:3000/api/movies/${movieId}`, {
        headers: {
            'Authorization': token
        }
      });
      const cinemaResponse = await axios.get(`http://catalog-service:3000/api/cinemas/${cinemaId}`, {
        headers: {
            'Authorization': token
        }
      });
      console.log(token);
      console.log('Movie response:', movieResponse.data);
      console.log('Cinema response:', cinemaResponse.data);
  
      if (!movieResponse.data || !cinemaResponse.data) {
        return res.status(404).json({ message: 'Movie or cinema not found' });
      }
    } catch (err) {
      console.error('Validation error:', err.message);
      return res.status(500).json({ message: 'Failed to validate movie and cinema availability' });
    }
  
    const booking = new Booking({
      movieId,
      cinemaId,
      showtime,
      seats,
      paymentConfirmed: false,
      paymentPending: true
    });
  
    try {
      const newBooking = await booking.save();
      console.log('New booking:', newBooking);
      res.status(201).json(newBooking);
    } catch (err) {
      console.error('Saving booking error:', err.message);
      res.status(400).json({ message: err.message });
    }
  };
  
  /// Confirm payment for a booking
exports.confirmPayment = async (req, res) => {
    const { bookingId } = req.body;
  
    try {
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      if (booking.paymentConfirmed) {
        return res.status(400).json({ message: 'Payment already confirmed for this booking' });
      }
  
      // Send a notification to the Notification Service
      const token = req.headers['authorization'];
      await axios.post(
        'http://notification-service:8000/api/notifications',
        {
          bookingId: booking._id,
          message: 'Payment confirmed for your booking.'
        },
        {
          headers: {
            "Authorization": token
          }
        }
      );
  
      booking.paymentConfirmed = true;
      booking.paymentPending = false;
      const updatedBooking = await booking.save();
  
      res.json(updatedBooking);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

// Update a booking
exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.movieId = req.body.movieId || booking.movieId;
    booking.cinemaId = req.body.cinemaId || booking.cinemaId;
    booking.showtime = req.body.showtime || booking.showtime;
    booking.seats = req.body.seats || booking.seats;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
  
      await Booking.deleteOne({ _id: req.params.id });
      res.json({ message: 'Booking canceled successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  