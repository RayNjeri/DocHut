const chaiHttp = require('chai-http');
const chai = require('chai');
const supertest = require('supertest');
const should = require('chai').should;
expect = require('chai').expect;
chai.use(chaiHttp);


api = supertest('http://localhost:8000');

describe('/POST user', () => {
  it('it should create a users', (done) => {
    api.post('/api/users/', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.statusMessage).to.equal('OK');
      expect(body).to.equal(true);
    });
    done();
  });

  it('should not signup users if required fields are missing', (done) => {
    api.post('/api/user/', (error, response, body) => {
      expect(error.statusCode).to.equal(400);
      expect(error.statusMessage).to.equal('Fill the required fields');
    });
    done();
  });

  it('should not signup users with existing email address or userName', (done) => {
    api.post('/api/user/', (error, response, body) => {
      expect(error.statusCode).to.equal(409);
      expect(error.statusMessage).to.equal('A User With The Email Address Or Username Already Exists');
    });
  });

  it('should not login an invalid user', (done) => {
    api.post('api/user/login', (error, response, body) => {
      expect(error.statusCode).equal(403);
      expect(error.statusMessage).to.equal('Invalid User');
    });
  });

  it('it should GET all the users', (done) => {
    api.get('/api/user/', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.statusMessage).to.equal('OK');
      expect(body).to.equal(true);
    });
    done();
  });

  it('should list a SINGLE user on /user/<id> GET', (done) => {
    api.get('/api/user/:userId', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.statusMessage).to.equal('OK');
    });
    done();
  });

  it('should update a SINGLE user on /user/<id> PUT', (done) => {
    api.put('/api/users/:userId', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.statusMessage).to.equal('User Attributes Successfully Updated!');
      expect(body).to.be.a('object');
      expect(response.body.userName).to.not.equal(null);
    });
    done();
  });


  it('should delete a SINGLE user on /user/<id> DELETE', (done) => {
    api.delete('/api/users/:userId', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.statusMessage).to.equal('User successfully Deleted!');
      expect(body).to.be.a('object');
      expect(response.body.userName).to.not.equal(null);
    });
    done();
  });
});

