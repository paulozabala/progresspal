//import models
const { default: mongoose } = require('mongoose');
const eventModel= require('../models/eventModel');

require('express-async-errors');
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

    if(!eventCreated){
        return next(new AppError('Event not created',404));
    }

    return res.status(201).json({
       status:'success',
       data:{
        data: eventCreated,
       },
    });  

};

exports.updateEvent = async(req,res,next)=>{
    const id = req.params.id;
    
    const eventUpdated = await eventModel.findOneAndUpdate({_id: new mongoose.Types.ObjectId(id)}, req.body ,{new : true});
    
    if(!eventUpdated){
        return next(new AppError('event was not updated',400));
    }

    return res.status(200).json({
        status:'success',
        data:{
            eventUpdated,
        },
    });
};