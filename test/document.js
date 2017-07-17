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

const app = require('../app');
let token = '';

chai.use(chaiHttp);

const testDocument = {
  title: 'First Doc',
  content: 'this better work',
  access: 'public'
};

describe('/POST document', () => {
  const documentsEndpoint = '/api/document';

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

  it('should create a document successfully', (done) => {
    let createStub = sinon.stub(document, 'create').resolves(testDocument);
    request(app)
      .post(documentsEndpoint)
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        assert.equal(res.body.title, testDocument.title);
        createStub.restore();
        done();
      });
  });

  it('should fail to add a document', (done) => {
    let createStub = sinon.stub(document, 'create').rejects();
    request(app)
      .post(documentsEndpoint)
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        createStub.restore();
        done();
      });
  });

  it('should fail to update when document id not found', (done) => {
    let findByIdStub = sinon.stub(document, 'findById').resolves();
    request(app)
      .put('/api/document/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('should fail to update when error occurs', done => {
    let findByIdStub = sinon.stub(user, 'findById').rejects();
    request(app)
      .put('/api/document/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('should update fields sucessfully', (done) => {
    let findByIdStub = sinon.stub(document, 'findById').resolves({
      update: () => new Promise((resolve, reject) => {
        resolve({});
      })
    });
    request(app)
      .put('/api/document/1')
      .set('x-access-token', token)
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('should fail when update fails', (done) => {
    let findByIdStub = sinon.stub(document, 'findById').resolves({});
    let updateStub = sinon.stub(document, 'update').rejects({});
    request(app)
      .put('/api/document/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        updateStub.restore();
        done();
      });
  });

  it('Should return all the documents with pagination', function (done) {
    let findAllStub = sinon.stub(document, 'findAll').resolves([{}, {}]);
    request(app)
      .get('/api/document')
      .query({ limit: 2, offset: 3 })
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, [{}, {}]);
        findAllStub.restore();
        done();
      });
  });

  it('Should return all the documents', function (done) {
    let findAllStub = sinon.stub(document, 'findAll').resolves([{}, {}]);
    request(app)
      .get('/api/document')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, [{}, {}]);
        findAllStub.restore();
        done();
      });
  });

  it('Should  fail to return all the documents', function (done) {
    let findAllStub = sinon.stub(document, 'findAll').rejects([{}, {}]);
    request(app)
      .get('/api/document')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, [{}, {}]);
        findAllStub.restore();
        done();
      });
  });

  it('should fail to retrieve one document', done => {
    let findByIdStub = sinon.stub(document, 'findById').resolves();
    request(app)
      .get('/api/document/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('should fail to retrieve one document when error occurs', done => {
    let findByIdStub = sinon.stub(user, 'findById').rejects();
    request(app)
      .get('/api/document/1')
      .set('x-access-token', token)
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('should retrieve one document by id', (done) => {
    let findByIdStub = sinon.stub(document, 'findById').resolves({ id: 1 });
    request(app)
      .get('/api/document/1')
      .set('x-access-token', token)
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        assert.deepEqual(res.body, { id: 1 });
        findByIdStub.restore();
        done();
      });
  });
  it('should fail to delete when document id not found', (done) => {
    let findByIdStub = sinon.stub(document, 'findById').resolves();
    request(app)
      .delete('/api/document/1')
      .set('x-access-token', token)
      .expect(404)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        done();
      });
  });

  it('should delete a document successfully ', (done) => {
    let findByIdStub = sinon.stub(document, 'findById').resolves({
      destroy: () => new Promise((resolve, reject) => {
        resolve(true);
      })
    });
    let destroyStub = sinon.stub(document, 'destroy').resolves({});
    request(app)
      .delete('/api/document/1')
      .set('x-access-token', token)
      .expect(204)
      .end((err, res) => {
        if (err) throw err;
        findByIdStub.restore();
        destroyStub.restore();
        done();
      });
  });
});

