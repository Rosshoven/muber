// test helper set-up
const mongoose = require('mongoose');

// here's the magic where we now have 2 different databases...this is continuation from app.js lines 12-14. 
// We did not put and else statement in app.js because we want access to done() in our test helper world.
before(done => {
    mongoose.connect('mongodb://localhost/muber_test');
    mongoose.connection
      .once('open', () => done())
      .on('error', (error) => {
        console.warn(`Warning ${error}`);
      }) ;
});

beforeEach((done) => {
    const { drivers } = mongoose.connection.collections;
    
    drivers.drop()
    .then(() => done())
    // the very first time the db runs, we don't have a collection to drop, so an error will be thrown, 
    // so the .catch accepts it and says done so we can move on
    .catch(() => done());
})