const { query } = require('express');
const pool = require('../../db');
const queries = require('../queries');

const updateBooking = async (req, res) => {
  // changing the luggage type , maxmembers and vehicle.
  try {
    values = [
      req.body.vehicle,
      req.body.maxMembers,
      req.body.luggage,
      req.body.bookingId,
      req.body.userId,
    ];
    const result = await pool.query(queries.updateBooking, values);
    res.status(200).json({ message: 'Booking updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error Updating booking' });
  }
};

const getBookingsForInitiator = async (req, res) => {
  try {
    values = [req.body.userId];
    const result = await pool.query(queries.getBookingsForInitiator, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: 'Error getting bookings for the initiator' });
  }
};

const getRequestsForBooking = async (req, res) => {
  try {
    const userId = req.body.userId;
    values = [req.body.bookingId];

    const result = await pool.query(queries.getRequestsForBooking, values);
    console.log(result.rows);
    console.log(values, userId);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(400).json({ Error: 'Error getting requests for the booking' });
  }
};

const approveRequest = async (req, res) => {
  //verify the initiator
  try {
    updateType = '';
    if (req.body.updateType == 'accept') {
      updateType = 'approved';
    } else if (updateType == 'reject') {
      updateType = 'rejected';
    } else {
      throw error;
    }
    values = [updateType, req.body.userId, req.body.bookingId];
    await pool.query(queries.approveRequest, values);

    if (updateType == 'approved') {
      await pool.query(queries.addUserToBooking, [
        req.body.userId,
        req.body.bookingId,
      ]);
      await pool.query(queries.updateCurrentMembers, [
        req.body.bookingId,
        req.body.userId,
      ]);
      res.status(200).json({ Success: 'Request updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ Error: 'Error approving request' });
  }
};

// const removeBuddy = async(req,res)=>{
//   try{b
//     values=[req.body.]
//     await pool.query(queries.removeBuddy,values)

//   }
// }

const getBuddiesFromBooking = async (req, res) => {
  try {
    values = [req.body.bookingId];
    const result = await pool.query(queries.getBuddiesFromBooking, values);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Error getting buddies from booking' });
  }
};
module.exports = {
  updateBooking,
  getRequestsForBooking,
  approveRequest,
  getBookingsForInitiator,
  getBuddiesFromBooking,
};
