const app = require('./app');

// tell the express application to listen to incoming HTTP requests on Port 3050
app.listen(3050, () => {
    console.log("Run Run Running on 3050")
});