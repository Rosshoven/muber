const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
// direct access to driver model (express, mocha and mongoose "don't always play nicely")
const Driver = mongoose.model('driver');


describe('The Drivers controller', () => {
    it ('POST to /api/drivers creates a new driver', (done) => {
        // don't forget this is aynchronous so it returns a promise
        Driver.countDocuments().then(count => {
            request(app)
            .post('/api/drivers')
            .send({ email: 'test@test.com' })
            .end(() => {
                Driver.countDocuments().then(newCount => {
                    assert(count + 1 === newCount);
                    done();   
            });
          })
       });
    });

    it ('PUT to /api/driver/:id edits an existsing driver', (done) => {
        // create a driver first
        const driver = new Driver({ email: 'jerry@garcia.pot', driving: false });
        // save driver and request(app)
        driver.save().then(() => {
            request(app)
            // start editing this url
              .put(`/api/drivers/${driver._id}`)
              .send({ driving: true })
              .end(() => {
                Driver.findOne({ email: 'jerry@garcia.pot' })
                .then((driver) => {
                    assert(driver.driving === true);
                    done();
                });
              });
            });
    });

    it ('DELETE to /api/driver/:id deletes an existing driver', done => {
        const driver = new Driver({ email: 'Soon2b@deleted.bye' });

        driver.save().then(() => {
            request(app)
              .delete(`/api/drivers/${driver._id}`)
              .end(() => {
                Driver.findOne({ email: 'Soon2b@deleted.bye' })
                  .then(driver => {
                    assert(!driver);
                    done();
                  });
              });
        });
    });

    it('GET to /api/drivers and finds drivers in a locaiton', done => {
        const seattleDriver = new Driver({
            email: 'seattle@test.com',
            geometry: { type: 'Point', coordinates: [-122.4759902, 47.6147628] }
        });

        const miamiDriver = new Driver({
            email: 'miami@test.com', 
            geometry: { type: 'Point', coordinates: [-80.253, 25.791] }
        });

        Promise.all([ seattleDriver.save(), miamiDriver.save() ])
          .then(() => {
            request(app)
            .get('/api/drivers?lng=-80&lat=25')
            .end((err, response) => {
                console.log(response);
                assert(response.body.length === 1);
                assert(response.body[0].email === 'miami@test.com');
                done();
            })
          })
    });

});

        // send is sending info to the server - not send request out to client or DB