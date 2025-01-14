const { query } = require('express');
require('dotenv').config();
const pool = require('../../db');
const queries = require('../queries');
const jwt = require('jsonwebtoken');
const json = require('body-parser/lib/types/json');
const jwtSecretKey = process.env.JWT_SECRET;
const authToken = async (req, res) => {
  try {
    const [email, password] = [req.body.email, req.body.password];
    values = [req.body.email];
    console.log('values', values);
    const result = await pool.query(queries.userLookup, values);
    console.log(result.rows);

    if (result.rows.length === 0) {
      return res.status(401).send('Invalid email');
    } else if (result.rows[0].password !== password) {
      return res.status(401).send('Invalid password');
    } else {
      const loginData = {
        email: result.rows[0].collegeemail,
        userid: result.rows[0].userid,
        signInTime: Date.now(),
      };
      const token = jwt.sign(loginData, jwtSecretKey);
      res.status(200).json({ message: 'success', token });
    }
  } catch (error) {
    console.error(error);

    res.status(400).json({ message: 'Error logging in' });
  }
};

const verify = async (req, res) => {
  const token = req.headers['authorization'];
  console.log(token);
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const verified = jwt.verify(token, jwtSecretKey);

    if (verified) {
      res.status(200).json({ message: 'verified' });
    } else {
      res.status(400).send('Could not verify');
    }
  } catch (error) {
    // console.log(verified);
    console.log(error);
    res.status(400).send('Invalid Token');
  }
};
module.exports = { authToken, verify };
