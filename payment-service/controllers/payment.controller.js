const axios = require('axios');
exports.manualConfirmPayment = async (req, res) => {
    const { bookingId } = req.body;
    const token = req.headers['authorization'];
  
    try {
      // Send a request to the Booking Service to confirm the payment
      const confirmPaymentResponse = await axios.post('http://booking-service:4000/api/bookings/confirm-payment', 
      {
        bookingId
      },
      {
        headers: {
          "Authorization": token
        }
      });
  
      if (confirmPaymentResponse.status === 200) {
        res.json({ message: 'Payment manually confirmed' });
      } else {
        res.status(400).json({ message: confirmPaymentResponse.data.message });
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
};
