const { Router } = require('express');
const controller = require('./controller');

const router = Router();

/* 
{
  "userId":"2",
  "placeTo": "Pala",
  "placeFrom":"Kottayam",
  "date":"2024-08-29"
}
*/
router.post('/search', controller.searchResult);

/*
{
"userId":"2",
"bookingId":"3"
} */
router.post('/createRequest', controller.createRequest);

/* format:{
"userId":<value>,
"placeFrom:"<value>,
"placeTo":<value>,
"vehicle":<value>,
"maxMembers":<value>,
"date":<value>,
"time":<HH:MM>
} */
router.post('/createBooking', controller.createBooking);

/*
{
"userId":"11"
}
 */
router.post('/getRequests', controller.getRequests);
/*{
  "userId":"11",
  "requestId":"1"
} */
router.post('/cancelRequest', controller.cancelRequest);

router.post('/getMyBookings', controller.getMyBookings);

module.exports = router;
