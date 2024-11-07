const chai = require('chai');
const chaiHttp = require('chai-http');
const axios = require('axios');
const express = require('express');
const router = require('../src/routes/valuesetRoutes'); 
const axiosMock = require('axios-mock-adapter');
const { expect } = chai;

chai.use(chaiHttp);

describe('ValueSet API Routes', () => {
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

  describe('GET /valueset/:id', () => {
    it('should retrieve a ValueSet by ID', async () => {
      const valueSetId = '12345';
      const mockResponse = { id: valueSetId, resourceType: 'ValueSet' };

      axiosStub.onGet(`https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet/${valueSetId}`).reply(200, mockResponse);

      const res = await chai.request(server).get(`/valueset/${valueSetId}`);
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(mockResponse);
    });
  });

  describe('PUT /valueset/:id', () => {
    it('should update an existing ValueSet', async () => {
      const valueSetId = '12345';
      const updatedValueSet = { id: valueSetId, resourceType: 'ValueSet', status: 'active' };
      axiosStub.onPut(`https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet/${valueSetId}`).reply(200, updatedValueSet);

      const res = await chai.request(server).put(`/valueset/${valueSetId}`).send(updatedValueSet);
      expect(res).to.have.status(200);
      expect(res.body).to.deep.equal(updatedValueSet);
    });
  });

  describe('POST /valueset', () => {
    it('should create a new ValueSet', async () => {
      const newValueSet = { resourceType: 'ValueSet', id: '67890' };
      const mockResponse = { ...newValueSet };

      axiosStub.onPost('https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet').reply(201, mockResponse);

      const res = await chai.request(server).post('/valueset').send(newValueSet);
      expect(res).to.have.status(201);
      expect(res.body).to.deep.equal(mockResponse);
    });
  });
});
