const { query } = require('express');
const pool = require('../../db');
const queries = require('../queries');

async function getUser(userId) {
  // console.log('Hello');
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
    console.log(req.body);

    values = [incomingData.placeFrom, incomingData.placeTo, incomingData.date];

    console.log(values);

    // Get all the bookings for a particular date and location
    const resultAll = await pool.query(queries.getBookings, values);

    // Get all the bookings that user has sent requests to
    // Using this to show the status in a booking
    const resultRequests = await pool.query(queries.getRequestsForId, [
      incomingData.userId,
    ]);

    // let resultFinal = [];
    console.log(resultAll.rows);
    console.log(resultRequests.rows);

    for (const r of resultAll.rows) {
      //Setting the initiator name for a booking
      const initiatorName = await getUser(r.initiatorid);
      r['initatorname'] = initiatorName.rows[0].name;

      //Getting buddies for a booking
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
    res
      .status(500)
      .json({ message: 'An error occurred searching the bookings' });
  }
};

const createBooking = async (req, res) => {
  try {
    const values = [
      req.body.userId,
      req.body.time,
      req.body.date,
      req.body.vehicleType,
      req.body.luggageType,
      req.body.placeFrom,
      req.body.placeTo,
      req.body.maxMembers,
    ];

    // Check if the booking for the same date and same journey exists
    const existingBooking = await pool.query(queries.checkSameBooking, [
      req.body.userId,
      req.body.date,
      req.body.placeFrom,
      req.body.placeTo,
    ]);

    if (existingBooking.rows.length != 0) {
      return res
        .status(401)
        .json({
          Error:
            'Booking for the same journey already exists for the same date',
        });
    }

    // Insert booking and await the result
    await pool.query(queries.createBooking, values);

    // Retrieve booking ID
    const result = await pool.query(queries.getBookingId, [req.body.userId]);
    const bookingId = result.rows[0].bookingid;

    // Add user to booking with the obtained bookingId
    await pool.query(queries.addUserToBooking, [req.body.userId, bookingId]);

    res.status(200).json({ Success: 'Booking Created Successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Error: 'Error Creating booking' });
  }
};

const createRequest = async (req, res) => {
  try {
    values = [req.body.userId, req.body.bookingId];

    //Checking if the request already exists
    const result = await pool.query(queries.checkRequest, [
      req.body.userId,
      req.body.bookingId,
    ]);
    if (result.rows.length != 0) {
      return res.status(400).json({ Error: 'Request already exists' });
    }

    await pool.query(queries.createRequest, values, (error, result) => {
      // if (error) throw error;
      res.status(200).json({ Success: 'Request sent Successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ Error: 'Error Joining Request' });
  }
};

module.exports = {
  searchResult,
  createBooking,
  createRequest,
};
