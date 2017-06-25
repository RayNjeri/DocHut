const chaiHttp = require('chai-http');
const chai = require('chai');
const request = require('supertest');
const should = require('chai').should;
const expect = require('chai').expect;
const assert = chai.assert;
const sinon = require('sinon');
require('sinon-as-promised');

const user = require('../server/models').User;

const app = require('../app');
let token = "";

chai.use(chaiHttp);

const testUser = {
  firstName: 'John',
  lastName: 'Doe',
  userName: 'johnode',
  email: 'john.doe@gmail.com',
  password: 'astrongpassword'
};

describe('/POST user', () => {
  const usersEndpoint = '/api/user';

  it('should fail when POST /user is called without params', (done) => {
    request(app)
      .post(usersEndpoint)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.message, "Enter All Required Fields");
        done();
      });
  });

  it('should fail when POST /user is called with invalid email', done => {
    const invalidTestUser = {
      firstName: 'John',
      lastName: 'Doe',
      userName: 'johnode',
      email: 'invalid',
      password: 'astrongpassword'
    };

    request(app)
      .post(usersEndpoint)
      .send(invalidTestUser)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.message, "Please Enter A Valid Email Address");
        done();
      });
  });

  it('should fail when user.create fails', done => {
    let createStub = sinon.stub(user, 'create').rejects({});

    request(app)
      .post(usersEndpoint)
      .send(testUser)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        createStub.restore();
        done();
      });
  });

  it('should create a new user successfully', done => {
    let createStub = sinon.stub(user, 'create').resolves({ id: 1 });

    request(app)
      .post(usersEndpoint)
      .send(testUser)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        assert(res.body.firstName, testUser.firstName);
        assert.property(res.body, 'token');
        token = res.body.token;
        createStub.restore();
        done();
      });
  });
});
