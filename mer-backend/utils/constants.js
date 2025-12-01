/**
 * Application Constants
 * Centralized configuration for magic numbers and strings
 */

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

// Response Messages
const MESSAGES = {
  SUCCESS: 'Operation successful',
  CREATED: 'Resource created successfully',
  UPDATED: 'Resource updated successfully',
  DELETED: 'Resource deleted successfully',
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized access',
  FORBIDDEN: 'Access forbidden',
  VALIDATION_ERROR: 'Validation error',
  SERVER_ERROR: 'Internal server error',
  DUPLICATE_ENTRY: 'Resource already exists',
};

// Pagination
const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Cache TTL (Time To Live) in seconds
const CACHE_TTL = {
  SHORT: 60,        // 1 minute
  MEDIUM: 300,      // 5 minutes
  LONG: 1800,       // 30 minutes
  VERY_LONG: 3600,  // 1 hour
};

// User Roles
const USER_ROLES = {
  ADMIN: 'admin',
  SUPER_ADMIN: 'super-admin',
  USER: 'user',
  STAFF: 'staff',
};

// Order Status
const ORDER_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

// Product Status
const PRODUCT_STATUS = {
  IN_STOCK: 'in-stock',
  OUT_OF_STOCK: 'out-of-stock',
  DISCONTINUED: 'discontinued',
};

// File Upload
const UPLOAD = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'application/msword'],
};

// Token Expiry
const TOKEN_EXPIRY = {
  ACCESS_TOKEN: '15m',
  REFRESH_TOKEN: '7d',
  RESET_PASSWORD: '1h',
};

// Rate Limiting
const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100,
  AUTH_MAX_REQUESTS: 5,
};

// Regex Patterns
const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,15}$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
};

module.exports = {
  HTTP_STATUS,
  MESSAGES,
  PAGINATION,
  CACHE_TTL,
  USER_ROLES,
  ORDER_STATUS,
  PRODUCT_STATUS,
  UPLOAD,
  TOKEN_EXPIRY,
  RATE_LIMIT,
  REGEX,
};
