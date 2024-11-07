require('dotenv').config();

const config = {
  fhirServerUrl: process.env.FHIR_SERVER_URL || 'https://ndoh-ln-ehrfhirweb02-01.health.internal/fhir/',
  valueSets: {
    medications: 'd62d0765-6b54-4ccd-abf2-aec9dd31d3e8',
    loinc: '361af102-f797-4f45-810a-7e908a5de84e'
  }
};

module.exports = config;
