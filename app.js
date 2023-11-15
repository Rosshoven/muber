// write code to generate a new express application
const express = require('express');
const bodyParser = require('body-parser');
// routes here is a function b/c its module.exports is written as a function
const routes = require('./routes/routes');
const app = express();
// app is an object that takes incoming http requests, and helps run some code inside the application

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/muber');
mongoose.connect('mongodb://127.0.0.1:27017/muber');



// with any incoming request, assume it is json and parse it into an object for us. note: has to be above routes()
app.use(bodyParser.json());
// call the routes function (module routes.js), passing in the app object
routes(app);

// send it out so index.js gets it for api routes
module.exports = app;
;