const express = require('express');
const proxy = require('express-http-proxy');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 8075;

app.use(express.json());
app.use(cors());

// Middleware to verify JWT
const verifyJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  jwt.verify(token, 'secretkey', (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

// Error handlerer
app.use((err, req, res, next) => {
  console.error('Proxy error:', err.message);
  res.status(500).json({ message: 'Proxy error', error: err.message });
});

// Proxy routes with JWT verification
app.use('/authenticate',proxy('http://auth-service:8888'));
app.use('/catalog', verifyJWT, proxy('http://catalog-service:3000'));
app.use('/bookings', verifyJWT, proxy('http://booking-service:4000'));
app.use('/payments', verifyJWT, proxy('http://payment-service:6000'));
app.use('/notifications', verifyJWT, proxy('http://notification-service:8000'));

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
