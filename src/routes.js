const { Router } = require('express');

const router = Router();

const myBookings = require('./controllers/MyBookings');

const Messages = require('./controllers/Messages');

const results = require('./controllers/Results');

const initiatedBookings = require('./controllers/InitiatedBookings');

const auth = require('./controllers/Auth');
const addUserId = require('./middlewares/addUserId');
const verifyEmail = require('./controllers/verifyEmail');

router.post('/auth', auth.authToken);
router.post('/verify', auth.verify);

router.use(addUserId);

router.post('/verifyEmail', verifyEmail);
/* 
{
  "placeTo": "Pala",
  "placeFrom":"Kottayam",
  "date":"2024-08-29"
}
*/

router.post('/sendMessage', Messages.sendMessage);

router.post('/search', results.searchResult);
/*



"bookingId":"3"
} */
router.post('/createRequest', results.createRequest);

/* format:{
"userId":<value>,
"placeFrom:"<value>,
"placeTo":<value>,
"vehicle":<value>,
"maxMembers":<value>,
"date":<value>,
"time":<HH:MM>
"luggage":"any"
} */
router.post('/createBooking', results.createBooking);

/*
{
"userId":"11"
}
 */
// router.post('/getRequestsForId', controller.getRequestsForId);
/*{
  "userId":"11",
  "requestId":"1"
} */
router.post('/cancelRequest', myBookings.cancelRequest);
/*
{
  "userId":"2"
}*/
router.post('/getMyBookings', myBookings.getMyBookings);

router.post(
  '/getBookingsForInitiator',
  initiatedBookings.getBookingsForInitiator
);

router.post('/getRequestsForBooking', initiatedBookings.getRequestsForBooking);

router.post('/getBuddiesFromBooking', initiatedBookings.getBuddiesFromBooking);

router.post('/approveRequest', initiatedBookings.approveRequest);

router.post('/getChatsForBooking', myBookings.getChatsForBooking);
module.exports = router;
