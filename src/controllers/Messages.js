const { query } = require('express');
const pool = require('../../db');
const queries = require('../queries');

const sendMessage = async (req, res) => {
  try {
    const checkIfUserIsInBooking = await pool.query(
      queries.checkIfUserIsInBooking,
      [req.body.userId, req.body.bookingId]
    );
    if (checkIfUserIsInBooking.rows.length === 0) {
      return res.status(400).json({ message: 'User is not in the booking' });
    }
    const resultInsert = await pool.query(queries.insertMessage, [
      req.body.userId,
      req.body.bookingId,
      req.body.messageText,
    ]);

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error in sending the message' });
  }
};

module.exports = { sendMessage };
