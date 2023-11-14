// I think this is all the routes, which we'll export right to app.js
// defining a function and immediately exporting it
module.exports = (app) => {

// get method, Request Handler 
// when this get method is run with this api route, run this function
// Watch for incoming requests of method get to the route http://localhost:3050/api
app.get('/api', (req, res) => {
    
    res.send({ hi: 'there' });
  });
};