const passwordValidator = require('password-validator');

// Create a schema
const schema = new passwordValidator();

// Add properties to it
schema
  .is()
  .min(6) // Minimum length 6
  .is()
  .max(100); // Maximum length 100

module.exports = schema;
