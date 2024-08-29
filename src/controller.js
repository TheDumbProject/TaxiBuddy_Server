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
      placeFrom: req.query.placeFrom.replace('%20', ' '),
      placeTo: req.query.placeTo.replace('%20', ' '),
    };
    values = [incomingData.placeFrom, incomingData.placeTo];
    console.log(values);
    await pool.query(queries.getBookings, values, (error, result) => {
      if (error) throw error;
      datetime = new Date(result.rows[0].datetime);
      sortedtime = [];
      for (booking in result) {
      }
      console.log(date.getDate());
      res.status(200).json(result.rows);
    });
  } catch (error) {
    console.log('Error: ', error);
  }
};
module.exports = {
  getUsers,
  searchResult,
};
