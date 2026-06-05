 const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { getUserById } = require('../models/user.model');

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Authorization token is missing');
    error.status = 401;
    throw error;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserById(decoded.id);
    if (!user) {
      const error = new Error('User not found');
      error.status = 401;
      throw error;
    }

    req.user = user;
    next();
  } catch (error) {
    const authError = new Error('Invalid or expired token');
    authError.status = 401;
    throw authError;
  }
});

module.exports = { protect };
