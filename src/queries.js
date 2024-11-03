const userLookup = 'SELECT * FROM Users WHERE collegeemail=$1';

const getBookings =
  'SELECT * FROM bookings WHERE sourceplace=$1 AND destination=$2 AND datebooked=$3 AND maxmembers>currentmembers ';

const getUser = 'SELECT name FROM Users WHERE userid=$1';

const createRequest =
  "INSERT INTO bookingrequests (UserID, BookingID, RequestStatus, TimeSent) VALUES ($1, $2, 'pending', NOW())";

const createBooking =
  'INSERT INTO Bookings (InitiatorID, TimeBooked, DateBooked, Vehicle, Luggage,SourcePlace, Destination, MaxMembers, CurrentMembers) VALUES($1,$2,$3,$4,$5,$6,$7,$8,1)';

const getRequestsForId =
  "SELECT b.*,br.requestid FROM Bookings b JOIN BookingRequests br ON b.BookingID = br.BookingID WHERE br.UserID = $1  AND br.RequestStatus = 'pending' ";

const cancelRequest =
  "DELETE FROM bookingrequests WHERE requestid=$1 and userid=$2 and requeststatus='pending'";

const getBuddiesFromBooking =
  'SELECT u.name,u.phonenumber FROM Users u JOIN UserBookings ub ON u.UserID = ub.UserID WHERE ub.BookingID = $1';

const getMyBookings =
  'SELECT * FROM Bookings b Join UserBookings ub ON b.bookingid = ub.bookingId WHERE ub.userid = $1';

const updateBooking =
  'UPDATE Bookings SET Vehicle = $1, MaxMembers = $2 Luggage= $3 WHERE BookingID = $4 AND InitiatorID = $5';

const getRequestsForBooking =
  "SELECT * from users u join bookingrequests br on br.userid=u.userid where br.bookingid=$1 AND br.requeststatus='pending' order by timesent";

const approveRequest =
  'UPDATE bookingrequests SET RequestStatus=$1 WHERE userId=$2 AND bookingId=$3';

const addUserToBooking =
  'INSERT INTO UserBookings (UserID, BookingID) VALUES ($1, $2)';

const removeBuddy = 'DELETE FROM ';

const checkInitiator =
  'SELECT 1 FROM Bookings WHERE BookingID = $1 AND InitiatorID = $2;';

const updateCurrentMembers =
  'UPDATE bookings SET CurrentMembers = CurrentMembers+1 WHERE bookingId = $1 AND InitiatorID=$2';

const insertMessage =
  'INSERT into Messages (userId,bookingId,TimeSent,MessageTxt) VALUES ($1,$2,NOW(),$3)';

const getMessages =
  'SELECT * FROM messages WHERE bookingId=$1 ORDER BY TimeSent DESC ';

const getBookingsForInitiator =
  'SELECT * FROM Bookings WHERE initiatorid=$1 order by datebooked,timebooked';

const getBookingId =
  'select * from bookings where initiatorid=$1 order by bookingid desc limit 1';

module.exports = {
  getBookings,
  createBooking,
  getRequestsForId,
  cancelRequest,
  createRequest,
  getUser,
  getBuddiesFromBooking,
  getMyBookings,
  getRequestsForBooking,
  approveRequest,
  addUserToBooking,
  checkInitiator,
  updateCurrentMembers,
  insertMessage,
  getMessages,
  getBookingsForInitiator,
  userLookup,
  getBookingId,
};
