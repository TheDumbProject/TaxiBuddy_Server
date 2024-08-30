const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getUsers);

/* format : {
  "placeTo":"Ernakulam%20Junction",
  "placeFrom":"IIITK"
  
}
*/
router.post('/search', controller.searchResult);

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

router.post('/createRequest', controller.createRequest);

router.post('/getRequests', controller.getRequests);

router.put('/updateRequest', controller.updateRequest);
module.exports = router;
