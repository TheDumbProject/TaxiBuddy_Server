const { query } = require('express');
const pool = require('../../db');
const queries = require('../queries');

/*
Notification add krni hai using websockets*/

async function getUser(userId) {
  console.log('Hello');
  const result = await pool.query(queries.getUser, [userId]);
  return result;
}
//Mybookings
const getMyBookings = async (req, res) => {
  try {
    values = [req.body.userId];
    // Bookings where user is already present
    const result = await pool.query(queries.getMyBookings, values);
    //getting initiator name for a booking
    for (const r of result.rows) {
      const initiatorName = await getUser(r.initiatorid);
      r['initatorname'] = initiatorName.rows[0].name;
      const buddies = await pool.query(queries.getBuddiesFromBooking, [
        r.bookingid,
      ]);
      r['buddies'] = buddies.rows;
      r.requeststatus = 'approved';
    }

    const requests = await getRequestsForId(req.body.userId);

    for (const r2 of requests.rows) {
      r2.requeststatus = 'pending';
    }

    res.status(200).json([...result.rows, ...requests.rows]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error in getting the bookings' });
  }
};
/*
  Notification add krni hai using websockets
  */

//myrequests

const getRequestsForId = async (userId) => {
  try {
    values = [userId];
    const result = await pool.query(queries.getRequestsForId, values);
    console.log('getRequestsForId Called');
    return result;
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'An error occurred in getting request for Id' });
  }
};

const cancelRequest = async (req, res) => {
  try {
    values = [req.body.requestId, req.body.userId];
    await pool.query(queries.cancelRequest, values, (error, results) => {
      res.status(200).json({ Success: 'Request removed Successfully....' });
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'An error occured' });
  }
};

module.exports = {
  getMyBookings,
  cancelRequest,
};