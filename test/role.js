const chaiHttp = require('chai-http');
const chai = require('chai');
const request = require('supertest');
const should = require('chai').should;
const expect = require('chai').expect;
const assert = chai.assert;
const sinon = require('sinon');
require('sinon-as-promised');

const bcrypt = require('bcrypt-nodejs');
const document = require('../server/models').Document;
const user = require('../server/models').User;
const role = require('../server/models').Role;

const app = require('../app');
let token = '';

chai.use(chaiHttp);

const testRole = {
  roleName: 'roleName',
};

describe('/POST role', () => {
  const rolesEndpoint = '/api/roles';

  //
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

  it('should fail to add a role', (done) => {
    let createStub = sinon.stub(role, 'create').rejects();
    request(app)
      .post(rolesEndpoint)
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        createStub.restore();
        done();
      });
  });

  it('should fail to update when error occurs', done => {
    let findByIdStub = sinon.stub(role, 'find').rejects();
    request(app)
      .put('/api/roles/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  
  it('should fail to delete when role id not found', (done) => {
    let findStub = sinon.stub(role, 'find').resolves();
    request(app)
      .delete('/api/roles/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findStub.restore();
        done();
      });
  });
});

