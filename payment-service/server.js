const express = require('express');
const axios = require('axios');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const eurekaClient = require('./eureka-client/eurekaClient');

const app = express();
const PORT = 6000;

app.use(express.json());
app.use(cors());

const paymentRoutes = require('./routes/payment.routes');

app.use('/api/payments', authMiddleware(), paymentRoutes);

app.listen(PORT, () => {
  console.log(`Payment service running on port ${PORT}`);
});
