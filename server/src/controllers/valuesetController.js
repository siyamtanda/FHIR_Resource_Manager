const axios = require('axios');

// Function to get a specific ValueSet by ID
const getValueSet = async (req, res) => {
  const { id } = req.params;
  const url = `https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet/${id}`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving ValueSet', error: error.message });
  }
};

// Function to update an existing ValueSet
const updateValueSet = async (req, res) => {
  const { id } = req.params;
  const updatedValueSet = req.body;
  const url = `https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet/${id}`;
  
  try {
    const response = await axios.put(url, updatedValueSet, {
      headers: {
        'Content-Type': 'application/json',  
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ValueSet', error: error.message });
  }
};

// Function to create a new ValueSet
const createValueSet = async (req, res) => {
  const newValueSet = req.body;
  const url = 'https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet';

  try {
    const response = await axios.post(url, newValueSet, {
      headers: {
        'Content-Type': 'application/json',  
      },
    });
    res.status(201).json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ValueSet', error: error.message });
  }
};

// Function to get all ValueSets
const getAllValueSets = async (req, res) => {
  const url = 'https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/ValueSet';
  
  try {
    const response = await axios.get(url); // Fetch all ValueSets
    res.json(response.data); // Return the response data
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving all ValueSets', error: error.message });
  }
};



module.exports = {
  getValueSet,
  updateValueSet,
  createValueSet,
  getAllValueSets,
};