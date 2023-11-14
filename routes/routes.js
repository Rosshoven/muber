const DriversController = require('../controllers/drivers_controller');

// I think this is all the routes, which we'll export right to app.js
// FUNCTION defined and immediately exported
module.exports = (app) => {

// GET method, Request Handler 
// when this GET method is run with this api route, run this function
// Watch for incoming requests of method get to the route http://localhost:3050/api
app.get('/api', DriversController.greeting)
};