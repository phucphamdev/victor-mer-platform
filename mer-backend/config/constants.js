/**
 * Backend Application Constants
 * Centralized constants for better maintainability
 */

// HTTP Status Codes
exports.HTTP_STATUS = {
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

// User Roles
exports.USER_ROLES = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  CEO: 'CEO',
  MANAGER: 'Manager',
  STAFF: 'Staff',
  USER: 'User',
};

// Order Status
exports.ORDER_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
};

// Product Status
exports.PRODUCT_STATUS = {
  IN_STOCK: 'in-stock',
  OUT_OF_STOCK: 'out-of-stock',
  DISCONTINUED: 'discontinued',
};

// Product Types
exports.PRODUCT_TYPES = {
  ELECTRONICS: 'Electronics',
  FASHION: 'Fashion',
  BEAUTY: 'Beauty',
  JEWELRY: 'Jewelry',
  GROCERY: 'Grocery',
  HEALTH: 'Health',
  SPORTS: 'Sports',
  TOYS: 'Toys',
  BOOKS: 'Books',
  HOME: 'Home',
};

// Cache Keys
exports.CACHE_KEYS = {
  ALL_PRODUCTS: 'products:all',
  PRODUCT_BY_ID: (id) => `product:${id}`,
  ALL_CATEGORIES: 'categories:all',
  CATEGORY_BY_ID: (id) => `category:${id}`,
  ALL_BRANDS: 'brands:all',
  BRAND_BY_ID: (id) => `brand:${id}`,
  TOP_RATED_PRODUCTS: 'products:top-rated',
  POPULAR_PRODUCTS: (type) => `products:popular:${type}`,
};

// Cache TTL (in seconds)
exports.CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
};

// Pagination
exports.PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// File Upload
exports.UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  MAX_FILES: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
};

// Token Expiry
exports.TOKEN_EXPIRY = {
  ACCESS_TOKEN: '15m',
  REFRESH_TOKEN: '7d',
  EMAIL_VERIFICATION: '24h',
  PASSWORD_RESET: '1h',
};

// Rate Limiting
exports.RATE_LIMIT = {
  GENERAL: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
  },
  AUTH: {
    windowMs: 15 * 60 * 1000,
    max: 5,
  },
  PASSWORD_RESET: {
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,
  },
};

// Email Templates
exports.EMAIL_TYPES = {
  VERIFICATION: 'verification',
  PASSWORD_RESET: 'password_reset',
  ORDER_CONFIRMATION: 'order_confirmation',
  ORDER_STATUS_UPDATE: 'order_status_update',
};

// Regex Patterns
exports.REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10,15}$/,
  MONGODB_ID: /^[0-9a-fA-F]{24}$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
};
