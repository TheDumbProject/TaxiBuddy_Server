const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/getRequestsForBooking', controller.getRequestsForBooking);

router.post('/approveRequest', controller.approveRequest);

module.exports = router;
