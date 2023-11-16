const Driver = require('../models/driver');
// OBJECT, contains all the logic of how to respond to a specific request
// we have a controller for each type of resource in our application. Drivers in this case

// define and immediately export this object
module.exports = {

    greeting(req, res) {
        res.send({ hi: 'there' });
    },

    index(req, res, next) {
        // get the query string for our longitude-latitude points (decontructing)
        const { lng, lat } = req.query;

        // this will get me a list of drivers near me - https://www.mongodb.com/docs/manual/reference/operator/aggregation/geoNear/
        Driver.geoNear(
            { type: 'Point', coordinates: [lng, lat] },
            { spherical: true, maxDistance: 200000 }
        )
          .then(drivers => res.send(drivers))
          .catch(next);
    },

    create(req, res, next) {
        const driverProps = req.body;  

        Driver.create(driverProps)
          .then(driver => res.send(driver))
          .catch(next);
    },

    edit(req, res, next) {
        // First get access to the id of the driver we're trying to update
        const  driverId = req.params.id;
        // The updated attruvutes of the rec ord will be available as prevciously with...
        const driverProps =req.body;
        
        Driver.findByIdAndUpdate(driverId, driverProps)
        //   .then(() => Driver.findById(driverId))
          .then(driver => res.send(driver))
          .catch(next);
    },

    delete(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndDelete(driverId)
          .then(deletedDriver => res.status(204).send(deletedDriver))
          .catch(next);
    }
};

// above is ES6 of greeting: function(req, res) {}