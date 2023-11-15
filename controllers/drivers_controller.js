const Driver = require('../models/driver');
// OBJECT, contains all the logic of how to respond to a specific request
// we have a controller for each type of resource in our application. Drivers in this case

// define and immediately export this object
module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there' });
    },
    create(req, res) {
        const driverProps = req.body;  

        Driver.create(driverProps)
          .then(driver => res.send(driver))
      
    }
};

// above is ES6 of greeting: function(req, res) {}