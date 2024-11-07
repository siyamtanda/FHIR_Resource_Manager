const chai = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const { getCodeSystem, updateCodeSystem, createCodeSystem, getAllCodeSystems } = require('../src/controllers/codeSystemController'); // Updated to CodeSystem controller
 
const { expect } = chai;

// Tests for getCodeSystem
describe('getCodeSystem', () => {
  let req, res, axiosStub;

  beforeEach(() => {
    
    req = { params: { id: '123' } }; 
    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(), 
    };

    
    axiosStub = sinon.stub(axios, 'get');
  });

  afterEach(() => {
    
    sinon.restore();
  });

  it('should retrieve CodeSystem data when the API call is successful', async () => {
   
    const mockData = { resourceType: 'CodeSystem', id: '123', name: 'ExampleCodeSystem' };
    axiosStub.resolves({ data: mockData });

    await getCodeSystem(req, res);

   
    expect(axiosStub.calledOnceWith('https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem/123')).to.be.true;

    expect(res.json.calledOnceWith(mockData)).to.be.true;
  });

  it('should return a 500 status code and error message when the API call fails', async () => {
   
    const errorMessage = 'Network Error';
    axiosStub.rejects(new Error(errorMessage));

    await getCodeSystem(req, res);

    
    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(res.json.calledOnceWith({ message: 'Error retrieving CodeSystem', error: errorMessage })).to.be.true;
  });
});

// Tests for updateCodeSystem
describe('updateCodeSystem', () => {
  let req, res, axiosStub;

  beforeEach(() => {
    
    req = {
      params: { id: '123' }, 
      body: { name: 'UpdatedCodeSystem' } 
    };
    res = {
      json: sinon.spy(),
      status: sinon.stub().returnsThis(), 
    };

   
    axiosStub = sinon.stub(axios, 'put');
  });

  afterEach(() => {
   
    sinon.restore();
  });

  it('should update CodeSystem data when the API call is successful', async () => {
   
    const mockData = { resourceType: 'CodeSystem', id: '123', name: 'UpdatedCodeSystem' };
    axiosStub.resolves({ data: mockData });

    await updateCodeSystem(req, res);

    
    expect(axiosStub.calledOnceWith('https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem/123', req.body, { headers: { 'Content-Type': 'application/json' } })).to.be.true;

  
    expect(res.json.calledOnceWith(mockData)).to.be.true;
  });

  it('should return a 500 status code and error message when the API call fails', async () => {
   
    const errorMessage = 'Network Error';
    axiosStub.rejects(new Error(errorMessage));

    await updateCodeSystem(req, res);

    
    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(res.json.calledOnceWith({ message: 'Error updating CodeSystem', error: errorMessage })).to.be.true;
  });

  
});

// Tests for createCodeSystem
describe('createCodeSystem', () => {
    let req, res, axiosStub;
  
    beforeEach(() => {
      
      req = {
        body: { name: 'NewCodeSystem' } 
      };
      res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(), 
      };
  
      
      axiosStub = sinon.stub(axios, 'post');
    });
  
    afterEach(() => {
      
      sinon.restore();
    });
  
    it('should create a new CodeSystem when the API call is successful', async () => {
      
      const mockData = { resourceType: 'CodeSystem', id: '123', name: 'NewCodeSystem' };
      axiosStub.resolves({ data: mockData });
  
      await createCodeSystem(req, res);
  
     
      expect(axiosStub.calledOnceWith('https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem', req.body, { headers: { 'Content-Type': 'application/json' } })).to.be.true;
  
      
      expect(res.status.calledOnceWith(201)).to.be.true;
      expect(res.json.calledOnceWith(mockData)).to.be.true;
    });
  
    it('should return a 500 status code and error message when the API call fails', async () => {
     
      const errorMessage = 'Network Error';
      axiosStub.rejects(new Error(errorMessage));
  
      await createCodeSystem(req, res);
  
      
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Error creating CodeSystem', error: errorMessage })).to.be.true;
    });
  });
  
  // Tests for getAllCodeSystems
  describe('getAllCodeSystems', () => {
    let req, res, axiosStub;
  
    beforeEach(() => {
      
      req = {};
      res = {
        json: sinon.spy(),
        status: sinon.stub().returnsThis(), 
      };
  
      
      axiosStub = sinon.stub(axios, 'get');
    });
  
    afterEach(() => {
      
      sinon.restore();
    });
  
    it('should retrieve all CodeSystems when the API call is successful', async () => {
      
      const mockData = [{ resourceType: 'CodeSystem', id: '123', name: 'ExampleCodeSystem' }];
      axiosStub.resolves({ data: mockData });
  
      await getAllCodeSystems(req, res);
  
     
      expect(axiosStub.calledOnceWith('https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem')).to.be.true;
  
   
      expect(res.json.calledOnceWith(mockData)).to.be.true;
    });
  
    it('should return a 500 status code and error message when the API call fails', async () => {
      
      const errorMessage = 'Network Error';
      axiosStub.rejects(new Error(errorMessage));
  
      await getAllCodeSystems(req, res);
  
      
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Error retrieving all CodeSystems', error: errorMessage })).to.be.true;
    });
  });
