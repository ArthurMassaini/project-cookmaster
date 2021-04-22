const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const STATUS_UNAUTHORIZED = 401;
const secret = 'abc';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, secret);

    const user = await usersModel.getUserByEmail(decoded.data.email);
    const { _id: id } = user;
    req.userId = id;
    
    next();
  } catch (error) {
    res.status(STATUS_UNAUTHORIZED).json({ message: error.message });
  }
};

module.exports = authMiddleware;
