const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecretKey = process.env.JWT_SECRET;
const addUserId = (req, res, next) => {
  try {
    if (!req.headers) {
      return res.status(401).json({ Error: 'No headers found' });
    }
    const token = req.headers['authorization'];
    console.log(req.headers);

    if (!token) {
      return res.status(401).json({ Error: 'No token found in the header' });
    }

    const decoded = jwt.verify(token, jwtSecretKey);
    req.body.userId = decoded.userid;
    console.log(decoded);
    console.log(req.body);
    next();
  } catch (error) {
    console.error(error);
    console.log('error in addUserId');
    return res.status(401).json({ Error: 'Token is not valid' });
  }
};

module.exports = addUserId;
