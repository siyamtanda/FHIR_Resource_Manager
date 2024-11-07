const express = require('express');
const axios = require('axios');
const https = require('https');
const router = express.Router();


const FHIR_SERVER_URL = 'https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet';

// Creating an HTTPS agent 
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, 
});

//Route to retrieve a ValueSet by ID (GET)
router.get('/valueset/:id', async (req, res) => {
    const valueSetId = req.params.id;
    const url = `${FHIR_SERVER_URL}/${valueSetId}`;
  
    try {
      const response = await axios.get(url, { httpsAgent });
      res.json(response.data);
    } catch (error) {
      console.error('Error message:', error.message);
      handleErrorResponse(error, res);
    }
  });

  // Route to get all ValueSets (GET)
  router.get('/valueset', async (req, res) => {
    const url = 'https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet'; //
    try {
      const response = await axios.get(url, { httpsAgent });
      res.json(response.data); // Assuming this returns a bundle of ValueSets
    } catch (error) {
      handleErrorResponse(error, res);
    }
  });

// Route to update an existing ValueSet by ID (PUT)
router.put('/valueset/:id', async (req, res) => {
    const valueSetId = req.params.id;
    const updatedValueSet = req.body;
    const url = `${FHIR_SERVER_URL}/${valueSetId}`;
  
    try {
      const response = await axios.put(url, updatedValueSet, {
        httpsAgent,
        headers: {
          
          'Content-Type': 'application/json', 
        },
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error message:', error.message);
      handleErrorResponse(error, res);
    }
  });

// Route to create a new ValueSet (POST)
router.post('/valueset', async (req, res) => {
    const newValueSet = req.body;
    const url = FHIR_SERVER_URL;
    try {
      const response = await axios.post(url, newValueSet, {
        httpsAgent,
        headers: {
          'Content-Type': 'application/json',  
        },
      });
      res.status(201).json(response.data); 
    } catch (error) {
      console.error('Error message:', error.message);
      handleErrorResponse(error, res);
    }
  });

  

// Common function to handle errors
const handleErrorResponse = (error, res) => {
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
      res.status(500).json({ error: 'No response received from the FHIR server' });
    } else {
      console.error('Error setting up request:', error.message);
      res.status(500).json({ error: error.message });
    }
};

module.exports = router;
