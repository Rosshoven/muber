// write code to generate a new express application
const express = require('express');
// routes here is a function b/c module.exports
const routes = require('./routes/routes');
const app = express();
// app is an object that takes incoming http requests, and helps run some code inside the application

// call the routes function (module routes.js), passing in the app object
routes(app);

// send it out so index.js gets it for api routes
module.exports = app;