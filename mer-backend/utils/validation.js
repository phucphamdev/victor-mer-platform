/**
 * Validation Utilities
 * Common validation functions
 */

const validator = require('validator');

/**
 * Validate email
 */
exports.isValidEmail = (email) => {
  return validator.isEmail(email);
};

/**
 * Validate MongoDB ObjectId
 */
exports.isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

/**
 * Validate password strength
 */
exports.isStrongPassword = (password) => {
  return validator.isStrongPassword(password, {
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  });
};

/**
 * Validate URL
 */
exports.isValidUrl = (url) => {
  return validator.isURL(url);
};

/**
 * Sanitize string
 */
exports.sanitizeString = (str) => {
  return validator.escape(validator.trim(str));
};

/**
 * Validate phone number
 */
exports.isValidPhone = (phone) => {
  return validator.isMobilePhone(phone, 'any');
};

/**
 * Validate date
 */
exports.isValidDate = (date) => {
  return validator.isISO8601(date);
};

/**
 * Validate numeric
 */
exports.isNumeric = (value) => {
  return validator.isNumeric(String(value));
};

/**
 * Validate array not empty
 */
exports.isNotEmptyArray = (arr) => {
  return Array.isArray(arr) && arr.length > 0;
};

/**
 * Validate required fields
 */
exports.validateRequiredFields = (data, requiredFields) => {
  const missing = [];
  
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      missing.push(field);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  return true;
};
