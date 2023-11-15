// testing is where we use mocha
const assert = require('assert');
const request = require('supertest');
const app = require('../app');

// need done to complete to asynchonrous-ness :)
describe('The express app', () => {
    it('handles a GET request to /api', (done) => {
    // request is our supertest library and we're passing in the app file
  request(app)
    // what kind of request are we testing
    .get('/api')
    .end((err, response) => {
      assert(response.body.hi === 'there');
      done();
    });
  });
});