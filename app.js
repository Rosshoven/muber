// write code to generate a new express application
const express = require('express');
const bodyParser = require('body-parser');
// routes here is a function b/c its module.exports is written as a function
const routes = require('./routes/routes');
const app = express();
// app is an object that takes incoming http requests, and helps run some code inside the application

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test') {
mongoose.connect('mongodb://localhost/muber');
// mongoose.connect('mongodb://127.0.0.1:27017/muber')
};



// with any incoming request, assume it is json and parse it into an object for us. 
// note: has to be above routes() body pasrser adds a .body property
app.use(bodyParser.json());
// call the routes function (module routes.js), passing in the app object. middleware
routes(app);

// defining middle ware after the routes assignment takes place, NEED an error handler.
// you can use app.use to register any type of middleware with express
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message })
});

// send it out so index.js gets it for api routes
module.exports = app;
