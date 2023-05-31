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
    createdAt:Date,
});

eventSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

module.exports = mongoose.model('event', eventSchema);