const { query } = require('express');
const pool = require('../../db');
const queries = require('../queries');

async function checkInitiator(req, res, next) {
  try {
    console.log('namaste');
    userId = req.body?.userId;
    bookingId = req.body?.bookingId;
    if (!userId || !bookingId)
      throw new Error('please enter userId and bookingId ');

    await pool.query(
      queries.checkInitiator,
      [bookingId, userId],
      (error, result) => {
        result.rows.length !== 0
          ? next()
          : (() => {
              res.status(402).json({
                message: 'Error verifying Initator',
                error: "BookingId and InitiatorId don't match",
              });
            })();
      }
    );
  } catch (error) {
    console.error(error);
    res.status(402).json({ message: 'Error verifying Initator' });
  }
}

module.exports = checkInitiator;
