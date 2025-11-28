const { body, param, query } = require('express-validator');

/**
 * Validation rules for Brand endpoints
 */
const brandValidators = {
  // Create brand validation
  create: [
    body('name')
      .trim()
      .notEmpty().withMessage('Brand name is required')
      .isLength({ max: 100 }).withMessage('Brand name must not exceed 100 characters'),
    
    body('email')
      .optional()
      .isEmail().withMessage('Please provide a valid email address')
      .normalizeEmail(),
    
    body('website')
      .optional()
      .isURL().withMessage('Please provide a valid website URL'),
    
    body('logo')
      .optional()
      .isURL().withMessage('Please provide a valid logo URL'),
    
    body('status')
      .optional()
      .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
    
    body('description')
      .optional()
      .isString().withMessage('Description must be a string'),
    
    body('location')
      .optional()
      .isString().withMessage('Location must be a string')
  ],

  // Update brand validation
  update: [
    param('id')
      .isMongoId().withMessage('Invalid brand ID'),
    
    body('name')
      .optional()
      .trim()
      .notEmpty().withMessage('Brand name cannot be empty')
      .isLength({ max: 100 }).withMessage('Brand name must not exceed 100 characters'),
    
    body('email')
      .optional()
      .isEmail().withMessage('Please provide a valid email address')
      .normalizeEmail(),
    
    body('website')
      .optional()
      .isURL().withMessage('Please provide a valid website URL'),
    
    body('logo')
      .optional()
      .isURL().withMessage('Please provide a valid logo URL'),
    
    body('status')
      .optional()
      .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
    
    body('description')
      .optional()
      .isString().withMessage('Description must be a string'),
    
    body('location')
      .optional()
      .isString().withMessage('Location must be a string')
  ],

  // Get single brand validation
  getById: [
    param('id')
      .isMongoId().withMessage('Invalid brand ID')
  ],

  // Delete brand validation
  delete: [
    param('id')
      .isMongoId().withMessage('Invalid brand ID')
  ],

  // Query validation for list
  list: [
    query('page')
      .optional()
      .isInt({ min: 1 }).withMessage('Page must be a positive integer'),
    
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
    
    query('search')
      .optional()
      .isString().withMessage('Search must be a string'),
    
    query('status')
      .optional()
      .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
    
    query('sort')
      .optional()
      .isString().withMessage('Sort must be a string')
  ]
};

module.exports = brandValidators;
