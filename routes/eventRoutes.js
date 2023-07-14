const express = require("express");
const router = express.Router();
const eventController = require('../controllers/eventController');

router
    .route('/event')
        .post(eventController.createEvent);
    
router
    .route('/event/all') 
        .get(eventController.getEvents);
    
router
    .route('/event/:id')
        .put(eventController.updateEvent);

        
module.exports = router;