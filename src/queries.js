const getBookings =
  'SELECT * FROM bookings WHERE sourceplace=$1 AND destination=$2 AND datebooked=$3';

const getUser = 'SELECT name FROM Users WHERE userid=$1';

const createRequest =
  "INSERT INTO bookingrequests (UserID, BookingID, RequestStatus, TimeSent) VALUES ($1, $2, 'Pending', NOW())";

const createBooking = '';

const getRequests = 'SELECT * FROM bookingrequests WHERE userid=$1';

const cancelRequest =
  'DELETE FROM bookingrequests WHERE requestid=$1 and userid=$2';

const getBuddiesFromBooking =
  'SELECT u.name FROM Users u JOIN UserBookings ub ON u.UserID = ub.UserID WHERE ub.BookingID = $1';

const getMyBookings =
  'SELECT * FROM Bookings b Join UserBookings ub ON b.bookingid = ub.bookingId WHERE ub.userid = $1';

module.exports = {
  getBookings,
  createBooking,
  getRequests,
  cancelRequest,
  createRequest,
  getUser,
  getBuddiesFromBooking,
  getMyBookings,
};
