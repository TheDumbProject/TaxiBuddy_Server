const getBookings =
  'SELECT * FROM bookings WHERE sourceplace=$1 AND destination=$2';

module.exports = {
  getBookings,
};
