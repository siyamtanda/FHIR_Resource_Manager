const axios = require('axios');

// Function to get a specific CodeSystem by ID
const getCodeSystem = async (req, res) => {
  const { id } = req.params;
  const url = `https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem/${id}`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving CodeSystem', error: error.message });
  }
};

// Function to update an existing CodeSystem
const updateCodeSystem = async (req, res) => {
  const { id } = req.params;
  const updatedCodeSystem = req.body;
  const url = `https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem/${id}`;

  try {
    const response = await axios.put(url, updatedCodeSystem, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error updating CodeSystem', error: error.message });
  }
};

// Function to create a new CodeSystem
const createCodeSystem = async (req, res) => {
  const newCodeSystem = req.body;
  const url = 'https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem';

  try {
    const response = await axios.post(url, newCodeSystem, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating CodeSystem', error: error.message });
  }
};

// Function to get all CodeSystems
const getAllCodeSystems = async (req, res) => {
  const url = 'https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/CodeSystem';

  try {
    const response = await axios.get(url); // Fetch all CodeSystems
    res.json(response.data); // Return the response data
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving all CodeSystems', error: error.message });
  }
};

module.exports = {
  getCodeSystem,
  updateCodeSystem,
  createCodeSystem,
  getAllCodeSystems
};
