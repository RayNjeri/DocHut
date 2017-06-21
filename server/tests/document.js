const chaiHttp = require('chai-http');
const chai = require('chai');
const supertest = require('supertest');
const should = require('chai').should;
expect = require('chai').expect;
chai.use(chaiHttp);

api = supertest('http://localhost:8000');

describe('Document', () => {
  it('should create a document on /document/POST', (done) => {
    api.post('/api/document/', (error, response, body) => {
      expect(response.statusCode).to.equal(201);
      expect(response.statusMessage).to.equal('Document Successfully Created');
      expect(body).to.equal(true);
    });
    done();
  });

  it('shoould update a document on /document/PUT', (done) => {
    api.put('/api/document/', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.statusMessage).to.equal('Document successfully Updated');
      expect(body).to.equal(true);
    });
    done();
  });

  it('it should GET document on /document/GET', (done) => {
    api.get('/api/document/', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.statusMessage).to.equal('OK');
      expect(body).to.be.a('object');
      expect(response.body.name).to.not.equal(null);
    });
    done();
  });

  it('should delete a document on /document/DELETE', (done) => {
    api.delete('/api/document/', (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      expect(response.statusMessage).to.equal('Document Successfully Deleted');
      expect(response.body.name).to.not.equal(null);
    });
  });
});
