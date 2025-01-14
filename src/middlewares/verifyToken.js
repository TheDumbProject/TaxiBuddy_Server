const jwt = require('jsonwebtoken');
require('dotenv').config();

// const secret = process.env.SUPABASE_SECRET;

const jwtSecretKey = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(token);
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
      console.log('verified');
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(400).send('Invalid Token');
  }
};

module.exports = verifyToken;
