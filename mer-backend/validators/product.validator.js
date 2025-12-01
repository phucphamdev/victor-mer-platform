const { body, param, query } = require('express-validator');

/**
 * Validation rules for Product endpoints
 */
const productValidators = {
  // Create product validation
  create: [
    body('title')
      .trim()
      .notEmpty().withMessage('Product title is required')
      .isLength({ max: 200 }).withMessage('Title must not exceed 200 characters'),
    
    body('slug')
      .optional()
      .trim()
      .isSlug().withMessage('Please provide a valid slug'),
    
    body('price')
      .notEmpty().withMessage('Price is required')
      .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    
    body('discount')
      .optional()
      .isFloat({ min: 0, max: 100 }).withMessage('Discount must be between 0 and 100'),
    
    body('quantity')
      .optional()
      .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    
    body('category')
      .notEmpty().withMessage('Category is required')
      .isMongoId().withMessage('Invalid category ID'),
    
    body('brand')
      .optional()
      .isMongoId().withMessage('Invalid brand ID'),
    
    body('status')
      .optional()
      .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
    
    body('img')
      .optional()
      .isURL().withMessage('Please provide a valid image URL'),
    
    body('description')
      .optional()
      .isString().withMessage('Description must be a string')
  ],

  // Update product validation
  update: [
    param('id')
      .isMongoId().withMessage('Invalid product ID'),
    
    body('title')
      .optional()
      .trim()
      .notEmpty().withMessage('Product title cannot be empty')
      .isLength({ max: 200 }).withMessage('Title must not exceed 200 characters'),
    
    body('price')
      .optional()
      .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    
    body('discount')
      .optional()
      .isFloat({ min: 0, max: 100 }).withMessage('Discount must be between 0 and 100'),
    
    body('quantity')
      .optional()
      .isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    
    body('category')
      .optional()
      .isMongoId().withMessage('Invalid category ID'),
    
    body('brand')
      .optional()
      .isMongoId().withMessage('Invalid brand ID'),
    
    body('status')
      .optional()
      .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive')
  ],

  // Get single product validation
  getById: [
    param('id')
      .isMongoId().withMessage('Invalid product ID')
  ],

  // Delete product validation
  delete: [
    param('id')
      .isMongoId().withMessage('Invalid product ID')
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
    
    query('category')
      .optional()
      .isMongoId().withMessage('Invalid category ID'),
    
    query('brand')
      .optional()
      .isMongoId().withMessage('Invalid brand ID'),
    
    query('minPrice')
      .optional()
      .isFloat({ min: 0 }).withMessage('Minimum price must be a positive number'),
    
    query('maxPrice')
      .optional()
      .isFloat({ min: 0 }).withMessage('Maximum price must be a positive number'),
    
    query('status')
      .optional()
      .isIn(['active', 'inactive']).withMessage('Status must be either active or inactive'),
    
    query('sort')
      .optional()
      .isString().withMessage('Sort must be a string')
  ]
};

module.exports = productValidators;
