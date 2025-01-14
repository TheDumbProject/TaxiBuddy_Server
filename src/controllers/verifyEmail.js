const { query } = require('express');
const pool = require('../../db');
const queries = require('../queries');
const jwt = require('jsonwebtoken');
const json = require('body-parser/lib/types/json');
const jwtSecretKey =
  '4U7bvJVkuep7bLX8e+Y/VBzhgtADOcN1Ipn/9mGSDZtidy0i19wMBXquuOxGAfFEJMzRi095Oq9LUpF1n8hrEg==';

const verifyEmail = async (req, res) => {
  try {
    const result = await pool.query(queries.verifyEmail, [req.body.email]);
    if (result.rows.length !== 0) {
      const loginData = {
        email: result.rows[0].collegeemail,
        userid: result.rows[0].userid,
        signInTime: Date.now(),
      };
      const token = jwt.sign(loginData, jwtSecretKey);
      res.status(200).json({ message: 'success', token });
    } else {
      res.status(400).json({
        Error: 'Email is not registered with us,Please contact admin',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ Error: 'Error verifying email' });
  }
};

module.exports = verifyEmail;
