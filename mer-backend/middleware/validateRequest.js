/**
 * Request Validation Middleware
 * Validates request body, params, and query
 */

const { validationResult } = require('express-validator');
const ApiError = require('../errors/api-error');
const { HTTP_STATUS } = require('../config/constants');

/**
 * Validate request and return errors if any
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path || error.param,
      message: error.msg,
    }));
    
    throw new ApiError(
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      'Validation failed',
      errorMessages
    );
  }
  
  next();
};

module.exports = validateRequest;
