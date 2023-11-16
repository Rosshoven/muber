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
});

        // send is sending info to the server - not send request out to client or DB