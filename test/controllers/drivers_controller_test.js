const assert = require('assert');
const request = require('supertest');
const app = require('../../app');


describe('The Drivers controller', () => {
    it ('POST to /api/drivers creates a new driver', (done) => {
        request(app)
          .post('/api/drivers')
        // send info to the server - not send request out
        .send({ email: 'test@test.com' })
        .end(() => {
            // assert(response.body.hello === 'Gordy');
            done();
          });
    });
});