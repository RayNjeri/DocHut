const chaiHttp = require('chai-http');
const chai = require('chai');
const request = require('supertest');
const should = require('chai').should;
const expect = require('chai').expect;
const assert = chai.assert;
const sinon = require('sinon');
require('sinon-as-promised');
const bcrypt = require('bcrypt-nodejs');

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

  it('should not login an invalid user', done => {
    let findOneStub = sinon.stub(user, 'findOne').rejects();

    request(app)
      .post('/api/user/login')
      .send({
        email: 'john.doe@gmail.com',
        password: 'astrongpassword'
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.message, "Invalid login credentials");
        findOneStub.restore();
        done();
      });
  });

  it('should fail when user not found', done => {
    let findOneStub = sinon.stub(user, 'findOne').resolves();

    request(app)
      .post('/api/user/login')
      .send({
        email: 'john.doe@gmail.com',
        password: 'astrongpassword'
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.message, "Invalid user");
        findOneStub.restore();
        done();
      });
  });

  it('Should fail with wrong password and email combination', (done) => {
    const saltRounds = bcrypt.genSaltSync(10);

    const password = bcrypt.hashSync('aStrongPassword', saltRounds);

    let findOneStub = sinon.stub(user, 'findOne').resolves({ password, id: 1 });

    request(app)
      .post('/api/user/login')
      .send({
        userName: 'Tester',
        password: 'wrongpassword'
      })
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        assert(res.body.message, 'Password/email does not match');
        findOneStub.restore();
        done();
      });
  });

  it('Should return that the user successfully logged in', (done) => {
    const saltRounds = bcrypt.genSaltSync(10);

    const password = bcrypt.hashSync('aStrongPassword', saltRounds);

    let findOneStub = sinon.stub(user, 'findOne').resolves({ password, id: 1, roleId: 1 });

    request(app)
      .post('/api/user/login')
      .send({
        userName: 'Tester',
        password: 'aStrongPassword'
      })
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert(res.body.message, 'You were successfully logged in');
        assert.property(res.body, 'token');
        token = res.body.token;
        findOneStub.restore();
        done();
      });
  });

  it('should fail to retrieve all available users', done => {
    let findAllStub = sinon.stub(user, 'findAll').rejects();
    request(app)
      .get('/api/user')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findAllStub.restore();
        done();
      });
  });


  it('Should return all the users', function (done) {
    let findAllStub = sinon.stub(user, 'findAll').resolves([{}, {}]);
    request(app)
      .get('/api/user')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, [{}, {}]);
        findAllStub.restore();
        done();
      });
  });

  it('should fail to retrieve one user', done => {
    let findByIdStub = sinon.stub(user, 'findById').resolves();
    request(app)
      .get('/api/user/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('should fail to retrieve one user when error occurs', done => {
    let findByIdStub = sinon.stub(user, 'findById').rejects();
    request(app)
      .get('/api/user/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });


  it('should retrieve one user by id', (done) => {
    let findByIdStub = sinon.stub(user, 'findById').resolves({ id: 1 });
    request(app)
      .get('/api/user/1')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, { id: 1 });
        findByIdStub.restore();
        done();
      });
  });

  it('should fail to update when user id not found', (done) => {
    let findByIdStub = sinon.stub(user, 'findById').resolves();
    request(app)
      .put('/api/user/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('should update fields sucessfully', (done) => {
    let findByIdStub = sinon.stub(user, 'findById').resolves({
      update: () => new Promise((resolve, reject) => resolve({}))
    });
    // let updateStub = sinon.stub(user, 'update').resolves({});
    request(app)
      .put('/api/user/1')
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        // updateStub.restore();
        done();
      });
  });

  it('should  fail when update fails', (done) => {
    let findByIdStub = sinon.stub(user, 'findById').resolves({});
    let updateStub = sinon.stub(user, 'update').rejects({});
    request(app)
      .put('/api/user/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        updateStub.restore();
        done();
      });
  });

  it('should fail to delete when user id not found', (done) => {
    let findByIdStub = sinon.stub(user, 'findById').resolves();
    request(app)
      .delete('/api/user/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('should delete user successfully ', (done) => {
    let findByIdStub = sinon.stub(user, 'findById').resolves({
      destroy: () => new Promise((resolve, reject) => {
        resolve(true);
      })
    });
    let destroyStub = sinon.stub(user, 'destroy').resolves({});
    request(app)
      .delete('/api/user/1')
      .set('x-access-token', token)
      .expect(204)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        destroyStub.restore();
        done();
      });
  });

  it('should fail to delete a user ', (done) => {
    let findByIdStub = sinon.stub(user, 'findById').resolves({
      destroy: () => new Promise((resolve, reject) => {
        reject();
      })
    });
    let destroyStub = sinon.stub(user, 'destroy').resolves({});
    request(app)
      .delete('/api/user/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        destroyStub.restore();
        done();
      });
  });

  it('should fail to delete', (done) => {
    let findByIdStub = sinon.stub(user, 'findById').rejects();
    request(app)
      .delete('/api/user/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('should fail when no quey is passed', (done) => {
    request(app)
      .get('/api/search/user')

      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        done();
      });
  });

  it('should fail to find user', (done) => {
    let findAllStub = sinon.stub(user, 'findAll').rejects();
    request(app)
      .get('/api/search/user')
      .query({ q: 'something' })
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findAllStub.restore();
        done();
      });
  });

  it('should find a user', (done) => {
    let findAllStub = sinon.stub(user, 'findAll').resolves();
    request(app)
      .get('/api/search/user')
      .query({ q: 'something' })
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        findAllStub.restore();
        done();
      });
  });

  it('should logout a user', (done) => {
    request(app)
      .post('/api/user/logout')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.message, 'You were logged out successfully');
        done();
      });
  });
});

