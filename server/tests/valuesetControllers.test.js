const chai = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const { getValueSet, updateValueSet, createValueSet, getAllValueSets } = require('../src/controllers/valuesetController'); 
 
const { expect } = chai;

// Tests for getValueSet
describe('getValueSet', () => {
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

  it('should retrieve ValueSet data when the API call is successful', async () => {
   
    const mockData = { resourceType: 'ValueSet', id: '123', name: 'ExampleValueSet' };
    axiosStub.resolves({ data: mockData });

    await getValueSet(req, res);

   
    expect(axiosStub.calledOnceWith('https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet/123')).to.be.true;

    expect(res.json.calledOnceWith(mockData)).to.be.true;
  });

  it('should return a 500 status code and error message when the API call fails', async () => {
   
    const errorMessage = 'Network Error';
    axiosStub.rejects(new Error(errorMessage));

    await getValueSet(req, res);

    
    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(res.json.calledOnceWith({ message: 'Error retrieving ValueSet', error: errorMessage })).to.be.true;
  });
});

// Tests for updateValueSet
describe('updateValueSet', () => {
  let req, res, axiosStub;

  beforeEach(() => {
    
    req = {
      params: { id: '123' }, 
      body: { name: 'UpdatedValueSet' } 
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

  it('should update ValueSet data when the API call is successful', async () => {
   
    const mockData = { resourceType: 'ValueSet', id: '123', name: 'UpdatedValueSet' };
    axiosStub.resolves({ data: mockData });

    await updateValueSet(req, res);

    
    expect(axiosStub.calledOnceWith('https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet/123', req.body, { headers: { 'Content-Type': 'application/json' } })).to.be.true;

  
    expect(res.json.calledOnceWith(mockData)).to.be.true;
  });

  it('should return a 500 status code and error message when the API call fails', async () => {
   
    const errorMessage = 'Network Error';
    axiosStub.rejects(new Error(errorMessage));

    await updateValueSet(req, res);

    
    expect(res.status.calledOnceWith(500)).to.be.true;
    expect(res.json.calledOnceWith({ message: 'Error updating ValueSet', error: errorMessage })).to.be.true;
  });

  
});

// Tests for createValueSet
describe('createValueSet', () => {
    let req, res, axiosStub;
  
    beforeEach(() => {
      
      req = {
        body: { name: 'NewValueSet' } 
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
  
    it('should create a new ValueSet when the API call is successful', async () => {
      
      const mockData = { resourceType: 'ValueSet', id: '123', name: 'NewValueSet' };
      axiosStub.resolves({ data: mockData });
  
      await createValueSet(req, res);
  
     
      expect(axiosStub.calledOnceWith('https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet', req.body, { headers: { 'Content-Type': 'application/json' } })).to.be.true;
  
      
      expect(res.status.calledOnceWith(201)).to.be.true;
      expect(res.json.calledOnceWith(mockData)).to.be.true;
    });
  
    it('should return a 500 status code and error message when the API call fails', async () => {
     
      const errorMessage = 'Network Error';
      axiosStub.rejects(new Error(errorMessage));
  
      await createValueSet(req, res);
  
      
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Error creating ValueSet', error: errorMessage })).to.be.true;
    });
  });
  
  // Tests for getAllValueSets
  describe('getAllValueSets', () => {
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
  
    it('should retrieve all ValueSets when the API call is successful', async () => {
      
      const mockData = [{ resourceType: 'ValueSet', id: '123', name: 'ExampleValueSet' }];
      axiosStub.resolves({ data: mockData });
  
      await getAllValueSets(req, res);
  
     
      expect(axiosStub.calledOnceWith('https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet')).to.be.true;
  
   
      expect(res.json.calledOnceWith(mockData)).to.be.true;
    });
  
    it('should return a 500 status code and error message when the API call fails', async () => {
      
      const errorMessage = 'Network Error';
      axiosStub.rejects(new Error(errorMessage));
  
      await getAllValueSets(req, res);
  
      
      expect(res.status.calledOnceWith(500)).to.be.true;
      expect(res.json.calledOnceWith({ message: 'Error retrieving all ValueSets', error: errorMessage })).to.be.true;
    });
  });
  


