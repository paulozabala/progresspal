const express = require("express");
const router = express.Router();
const eventController = require('../controllers/eventController');

router
    .route('events')
    .get(eventController.getEvents);
   // .post(eventController.saveEvent);

module.exports = router;