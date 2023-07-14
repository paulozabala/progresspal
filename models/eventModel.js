const mongoose = require('mongoose');

const schema = mongoose.Schema;

const eventSchema = new schema({
    name: String,
    description: String,
    place: String,
    img: String,
    goal: String,
    achieved: String,
    responsible: String,
    verifiedAt: [String],
    state: {
        type: String,
        enum:{
            values:['available','maintenance','sold','discarded'],
            message:"states are available,maintenance,sold and discarded"
        }
    },
    createdAt: Date,

});

eventSchema.pre('save', function (next) {
    if (!this.createdAt) {
        this.createdAt = new Date();
    }
    next();
});

module.exports = mongoose.model('event', eventSchema);