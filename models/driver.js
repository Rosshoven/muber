const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DriverSchema = new Schema({
    email: {
        type: String,
        // common piece of validation, easy
        required: true
        },
    driving: {
        type: Boolean,
        // when they sign up they don't automatically mark as driving
        default: false
    },
    location: Number
});

// Make The Model, get into Mongo
const Driver = mongoose.model('driver', (DriverSchema));

module.exports = Driver;