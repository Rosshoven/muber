const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const Schema = mongoose.Schema;


const PointSchema = new Schema({
    // taking this structure from https://geojson.org/
    type: { type: String, default: 'Point' },  
    coordinates: { type: [Number], index: '2dsphere' }
});

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
    geometry: PointSchema
});

// Make The Model, get into Mongo
const Driver = mongoose.model('driver', (DriverSchema));

module.exports = Driver;