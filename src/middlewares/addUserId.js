const jwt = require('jsonwebtoken');

const jwtSecretKey =
  '4U7bvJVkuep7bLX8e+Y/VBzhgtADOcN1Ipn/9mGSDZtidy0i19wMBXquuOxGAfFEJMzRi095Oq9LUpF1n8hrEg==';

const addUserId = (req, res, next) => {
  try {
    if (!req.headers) {
      return res.status(401).json({ message: 'No headers found' });
    }
    const token = req.headers['authorization'];
    if (!token) {
      next();
    }

    const decoded = jwt.verify(token, jwtSecretKey);
    req.body.userId = decoded.userid;
    console.log(decoded);
    console.log(req.body);
    next();
  } catch (error) {
    console.error(error);
    console.log('error in addUserId');
    return res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = addUserId;
