const express = require('express');
const axios = require('axios');
const https = require('https');
const router = express.Router();

// Creating an HTTPS agent 
const httpsAgent = new https.Agent({
  rejectUnauthorized: false, 
});

// Function to get the server URL based on the query parameter
const getServerUrl = (server) => {
  switch (server) {
    case 'test':
      return 'https://test-server-url/fhir/CodeSystem';
    case 'demo':
      return 'https://demo-server-url/fhir/CodeSystem';
    default:
      return 'https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem';
  }
};

// Route to retrieve a CodeSystem by ID (GET)
router.get('/codesystem/:id', async (req, res) => {
  const codeSystemId = req.params.id;
  const server = req.query.server || 'default';
  const url = `${getServerUrl(server)}/${codeSystemId}`;

  try {
    const response = await axios.get(url, { httpsAgent });
    res.json(response.data);
  } catch (error) {
    console.error('Error message:', error.message);
    handleErrorResponse(error, res);
  }
});

// Route to get all CodeSystems (GET)
router.get('/codesystem', async (req, res) => {
  const server = req.query.server || 'default';
  const url = getServerUrl(server);

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
  const server = req.query.server || 'default';
  const url = `${getServerUrl(server)}/${codeSystemId}`;

  try {
    const response = await axios.put(url, updatedCodeSystem, {
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

// Route to create a new CodeSystem (POST)
router.post('/codesystem', async (req, res) => {
  const newCodeSystem = req.body;
  const server = req.query.server || 'default';
  const url = getServerUrl(server);

  try {
    const response = await axios.post(url, newCodeSystem, {
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