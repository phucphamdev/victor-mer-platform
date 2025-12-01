const { validationResult } = require('express-validator');

/**
 * Validation middleware to handle express-validator results
 * Catches validation errors and formats them according to Google API standards
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.path || error.param,
      message: error.msg,
      value: error.value
    }));

    return res.status(400).json({
      status: 'error',
      message: 'Validation Error',
      errors: errorMessages
    });
  }
  
  next();
};

module.exports = { validateRequest };
