const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware');
const eurekaClient = require('./eureka-client/eurekaClient');

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors());

const notificationRoutes = require('./routes/notification.routes');

app.use('/api/notifications', authMiddleware(), notificationRoutes);

app.listen(PORT, () => {
  console.log(`Notification service running on port ${PORT}`);
});
