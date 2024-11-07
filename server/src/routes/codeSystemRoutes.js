const express = require('express');
const axios = require('axios');
const https = require('https');
const router = express.Router();

// Use the same HTTPS agent to handle SSL issues
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// Route to retrieve a CodeSystem by ID (GET)
router.get('/codesystem/:id', async (req, res) => {
  const codeSystemId = req.params.id;
  const url = `https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem/${codeSystemId}`;

  try {
    const response = await axios.get(url, { httpsAgent });
    res.json(response.data);
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Route to get all CodeSystems (GET)
router.get('/codesystem', async (req, res) => {
  const url = 'https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem';
  try {
    const response = await axios.get(url, { httpsAgent });
    res.json(response.data);
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Route to update an existing CodeSystem by ID (PUT)
router.put('/codesystem/:id', async (req, res) => {
  const codeSystemId = req.params.id;
  const updatedCodeSystem = req.body;
  const url = `https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem/${codeSystemId}`;

  try {
    const response = await axios.put(url, updatedCodeSystem, {
      httpsAgent,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Route to create a new CodeSystem (POST)
router.post('/codesystem', async (req, res) => {
  const newCodeSystem = req.body;
  const url = 'https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem';

  try {
    const response = await axios.post(url, newCodeSystem, {
      httpsAgent,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.status(201).json(response.data);
  } catch (error) {
    handleErrorResponse(error, res);
  }
});

// Common function to handle errors (already in your code)
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
