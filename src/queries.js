const getBookings =
  'SELECT * FROM bookings WHERE sourceplace=$1 AND destination=$2 ';

const createBooking = '';

const getRequests = '';

const updateRequests = '';

module.exports = {
  getBookings,
  createBooking,
  getRequests,
  updateRequests,
};
