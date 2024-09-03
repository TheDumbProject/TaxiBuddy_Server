const { query } = require('express');
const pool = require('../../db');
const queries = require('../queries');

async function getUser(userId) {
  console.log('Hello');
  const result = await pool.query(queries.getUser, [userId]);
  return result;
}

//Results
const searchResult = async (req, res) => {
  try {
    incomingData = {
      userId: req.body.userId,
      placeFrom: req.body.placeFrom,
      placeTo: req.body.placeTo,
      date: req.body.date,
    };

    values = [incomingData.placeFrom, incomingData.placeTo, incomingData.date];

    console.log(values);

    const resultAll = await pool.query(queries.getBookings, values);

    const resultRequests = await pool.query(queries.getRequestsForId, [
      incomingData.userId,
    ]);

    // let resultFinal = [];
    console.log(resultRequests.rows);

    for (const r of resultAll.rows) {
      const initiatorName = await getUser(r.initiatorid);
      r['initatorname'] = initiatorName.rows[0].name;

      //getting buddies for a booking

      const buddies = await pool.query(queries.getBuddiesFromBooking, [
        r.bookingid,
      ]);
      r['buddies'] = buddies.rows;
      r['status'] = 'null';
      //Adding status parameter

      if (r.initiatorid == incomingData.userId) {
        r['status'] = 'initiator';
      }

      resultRequests.rows.forEach((r2) => {
        if (r2.bookingid == r.bookingid) {
          r['status'] = r2.requeststatus;
        }
      });

      // Removing the locked bookings
      // if (r.lock == false) {
      //   resultFinal.push(r);
      // }
    }

    res.status(200).json(resultAll.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
};

const createBooking = async (req, res) => {
  try {
    values = [
      req.body.userId,
      req.body.time,
      req.body.date,
      req.body.vehicle,
      req.body.luggage,
      req.body.placeFrom,
      req.body.placeTo,
      req.body.maxMembers,
    ];
    await pool.query(queries.createBooking, values, (error, result) => {
      if (error) throw error;
      res.status(200).json({ Success: 'User Created Successfully.' });
    });
  } catch (error) {
    console.error(error);
    res.status(402).json({ Error: 'Error Creating booking' });
  }
};

const createRequest = (req, res) => {
  try {
    values = [req.body.userId, req.body.bookingId];
    pool.query(queries.createRequest, values, (error, result) => {
      if (error) throw error;
      res.status(200).json({ Success: 'Request sent Successfully....' });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Error: 'Error Creating Request' });
  }
};

module.exports = {
  searchResult,
  createBooking,
  createRequest,
};
