const { query } = require('express');
const pool = require('../db');
const queries = require('./queries');

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users', (error, result) => {
    if (error) throw error;

    res.status(200).json(result.rows);
  });
};

const searchResult = async (req, res) => {
  try {
    incomingData = {
      placeFrom: req.body.placeFrom.replace('%20', ' '),
      placeTo: req.body.placeTo.replace('%20', ' '),
    };
    values = [incomingData.placeFrom, incomingData.placeTo];
    console.log(values);
    await pool.query(queries.getBookings, values, (error, result) => {
      if (error) throw error;
      // console.log(result);
      res.status(200).json(result.rows);
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};

const createBooking = async (req, res) => {
  values = [
    req.body.userId,
    req.body.placeFrom,
    req.body.placeTo,
    req.body.vehicle,
    req.body.maxMembers,
    req.body.date,
    req.body.time,
  ];
  await pool.query(queries.createBooking, values, (error, result) => {
    if (error) throw error;
    res.status(200).json({ Success: 'User Created Successfully.' });
  });
};

const createRequest = (req, res) => {
  values = [req.body.requestId, req.body.bookingId, 'false'];
  pool.query(queries.createRequest, value, (error, result) => {
    if (error) throw error;
    res.status(200).json({ Success: 'Request sent Successfully' });
  });
};

const getRequests = async (req, res) => {
  values = [req.body.userId];
  await pool.query(queries.getRequests, values, (error, result) => {
    res.status(200).json(result);
  });
};

const updateRequest = async (req, res) => {
  values = [req.body.requestId];
  await pool.query(queries.updateRequest, values, (error, result) => {
    res.status(200).json(result);
  });
};

module.exports = {
  getUsers,
  searchResult,
  createBooking,
  createRequest,
  getRequests,
  updateRequest,
};
