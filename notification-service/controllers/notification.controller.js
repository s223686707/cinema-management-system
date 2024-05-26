exports.sendNotification = async (req, res) => {
    const { bookingId, message } = req.body;
  
    try {
      // Simulate sending a notification
      console.log(`Notifications senttt for booking ${bookingId}: ${message}`);
  
      res.json({ success: true, message: 'Notification sent successfully for booking' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: err.message });
    }
  };