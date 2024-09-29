const { Router } = require('express');
const initiatedBookings = require('./controllers/InitiatedBookings');
const router = Router();

router.post('/approveRequest', initiatedBookings.updateBooking);

router.post('/getRequestsForBooking', initiatedBookings.getRequestsForBooking);

router.post('/approveRequest', initiatedBookings.approveRequest);

router.post(
  '/getBookingsForInitiator',
  initiatedBookings.getBookingsForInitiator
);

module.exports = router;
