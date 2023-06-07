const express = require("express");
const router = express.Router();
const eventController = require('../controllers/eventController');

router
    .route('/events')
        .get(eventController.getEvents)
        .post(eventController.createEvent);

module.exports = router;