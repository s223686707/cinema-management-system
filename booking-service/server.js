const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const eurekaClient = require('./eureka-client/eurekaClient');

const app = express();
const PORT = 4000;

mongoose.connect('mongodb+srv://admin:Domain12@cluster0.h6nrkl7.mongodb.net/bookings?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

app.use(express.json());
app.use(cors());

const bookingRoutes = require('./routes/booking.routes');

app.use('/api/bookings', authMiddleware(), bookingRoutes);

app.listen(PORT, () => {
  console.log(`Booking service running on port ${PORT}`);
});
