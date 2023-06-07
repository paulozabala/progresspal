//import models
const eventModel= require('../models/eventModel');

const AppError = require('./../utils/appError');


exports.getEvents = async(req,res,next)=>{
    const events = await eventModel.find({});
    
    if(!events){
        return next(new AppError('No events found',404));
    }

    return res.status(200).json({
            status:'success',
            data:{
                events,
            }
        });
};

exports.createEvent = async(req,res,next)=>{

    const eventCreated = await eventModel.create(req.body);

    //if(!eventCreated){
       // return next(new AppError('Event not created',404));
   // }
    console.log(eventCreated);

    return res.status(201).json({
       status:'success',
       data:{
        data: eventCreated,
       },
    });  

};