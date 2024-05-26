// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    console.log('Token:', token);  // Log the token received
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);  // Log verification errors
        return res.status(500).json({ message: 'Failed to authenticate token' });
      }

      console.log('Decoded token:', decoded);  // Log the decoded token
      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
      }

      req.userId = decoded.id;
      req.userRole = decoded.role;
      next();
    });
  };
};

module.exports = authMiddleware;
