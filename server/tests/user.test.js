const chaiHttp = require('chai-http');
const chai = require('chai');
const supertest = require('supertest');
const should = require('chai').should;
expect = require('chai').expect;
chai.use(chaiHttp);


api = supertest('http://localhost:8000');

describe('User', function () {
  it('it should create a SINGLE user on /userPOST', (done) => {
    chai.request('http://localhost:8000')
      .post('api/user')
      .send({ 'firstName': 'Rachael', 'lastName': 'Njeri', 'userName': 'Ray', 'email': 'rachael.njeri@andela.com', 'password': 'qwerty123' })
      .end(function (err, res) {
        res.expect.have.status(200);
        res.expect.be.json;
        res.body.expect.be.a('object');
        res.body.expect.have.property('SUCCESS');
        res.body.SUCCESS.should.be.a('object');
        res.body.SUCCESS.should.have.property('firstName');
        res.body.SUCCESS.should.have.property('lastName');
        res.body.SUCCESS.should.have.property('userName');
        res.body.SUCCESS.should.have.property('email');
        res.body.SUCCESS.should.have.property('password');
        res.body.SUCCESS.firstName.should.equal('Rachael');
        res.body.SUCCESS.lastName.should.equal('Njeri');
        res.body.SUCCESS.userName.should.equal('Ray');
        res.body.SUCCESS.email.should.equal('rachael.njeri@andela.com');
        res.body.SUCCESS.password.should.equal('qwerty123')

      });
    done();
  });

  it('should not signup users if required fields are missing', (done) => {
    api.post('/api/user/', (error, response, body) => {
      expect(respone.statusCode).to.equal(400);
      expect(response.statusMessage).to.equal('Fill the required fields');
    });
    done();
  });

  it('should not signup users with existing email address or userName', (done) => {
    api.post('/api/user/', (error, response, body) => {
      expect(response.statusCode).to.equal(409);
      expect(response.statusMessage).to.equal('A User With The Email Address Or Username Already Exists');
    });
  });

  it('should not login an invalid user', (done) => {
    api.post('api/user/login', (error, respone, body) => {
      expect(respone.statusCode).equal(400);
      expect(response.statusMessage).to.equal('Invalid User')
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
    api.get('/api/user/', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.statusMessage).to.equal('OK');
    });
    done();
  });

  it('should update a SINGLE user on /user/<id> PUT', (done) => {
    api.put('api/user/2', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.statusMessage).to.equal('User Credentials Succesfully Updated')
    });
  });


  it('should delete a SINGLE user on /user/<id> DELETE', (done) => {
    api.delete('api/user/2', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.statusMessage).to.equal('User successfully Deleted')
    });
  });

});


