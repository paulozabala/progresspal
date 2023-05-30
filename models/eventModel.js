const mongoose = require('mongoose');

const schema = mongoose.Schema;

const eventSchema = new schema({
    name: String,
    Description:String,
    place:String,
    img:String,
    goal:String,
    achieved:String,
    responsible:String,
    verifiedAt:Array,
    createdAt:new Date().getDate,
});

module.exports = mongoose.Model('event', eventSchema);