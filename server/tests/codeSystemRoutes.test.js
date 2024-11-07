const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');
const express = require('express');
const router = require('../src/routes/codeSystemRoutes'); // Change to CodeSystem routes
const axiosMock = require('axios-mock-adapter');
const { expect } = chai;

chai.use(chaiHttp);

describe('CodeSystem API Routes', () => {
  let server;
  let axiosStub;

  before((done) => {
    const app = express();
    app.use(express.json());
    app.use(router);
    server = app.listen(3000, done);
  });

  beforeEach(() => {
    axiosStub = new axiosMock(axios);
  });

  afterEach(() => {
    axiosStub.reset();
  });

  after((done) => {
    if (server && server.listening) {
      server.close(done);
    } else {
      done();
    }
  });

  describe('GET /codesystem/:id', () => {
    it('should retrieve a CodeSystem by ID', async () => {
      const codeSystemId = '12345';
      const mockResponse = { id: codeSystemId, resourceType: 'CodeSystem' };

      axiosStub.onGet(`https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem/${codeSystemId}`).reply(200, mockResponse);

      const res = await chai.request(server).get(`/codesystem/${codeSystemId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(mockResponse);
    });
  });

  describe('PUT /codesystem/:id', () => {
    it('should update an existing CodeSystem', async () => {
      const codeSystemId = '12345';
      const updatedCodeSystem = { id: codeSystemId, resourceType: 'CodeSystem', status: 'active' };
      axiosStub.onPut(`https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem/${codeSystemId}`).reply(200, updatedCodeSystem);

      const res = await chai.request(server).put(`/codesystem/${codeSystemId}`).send(updatedCodeSystem);
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(updatedCodeSystem);
    });
  });

  describe('POST /codesystem', () => {
    it('should create a new CodeSystem', async () => {
      const newCodeSystem = { resourceType: 'CodeSystem', id: '67890' };
      const mockResponse = { ...newCodeSystem };

      axiosStub.onPost('https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem').reply(201, mockResponse);

      const res = await chai.request(server).post('/codesystem').send(newCodeSystem);
      expect(res).to.have.status(201);
      expect(res.body).to.deep.equal(mockResponse);
    });
  });
});
