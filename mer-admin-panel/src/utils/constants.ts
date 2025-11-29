/**
 * Frontend Application Constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000',
  TIMEOUT: 30000,
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
};

// Toast Configuration
export const TOAST_CONFIG = {
  POSITION: 'top-right' as const,
  AUTO_CLOSE: 3000,
  HIDE_PROGRESS_BAR: false,
  CLOSE_ON_CLICK: true,
  PAUSEON_HOVER: true,
  DRAGGABLE: true,
};

// Product Status
export const PRODUCT_STATUS = {
  IN_STOCK: 'in-stock',
  OUT_OF_STOCK: 'out-of-stock',
  DISCONTINUED: 'discontinued',
} as const;

// Order Status
export const ORDER_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
} as const;

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  SUPER_ADMIN: 'super-admin',
  STAFF: 'staff',
} as const;

// File Upload
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
  MAX_FILES: 10,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD/MM/YYYY',
  DISPLAY_WITH_TIME: 'DD/MM/YYYY HH:mm',
  API: 'YYYY-MM-DD',
  FULL: 'YYYY-MM-DD HH:mm:ss',
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: (field: string) => `${field} is required`,
  MIN_LENGTH: (field: string, length: number) => 
    `${field} must be at least ${length} characters`,
  MAX_LENGTH: (field: string, length: number) => 
    `${field} must not exceed ${length} characters`,
  INVALID_EMAIL: 'Invalid email address',
  INVALID_PHONE: 'Invalid phone number',
  PASSWORD_MISMATCH: 'Passwords do not match',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  USER: 'admin',
  TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  THEME: 'theme',
  LANGUAGE: 'language',
};

// Product Types
export const PRODUCT_TYPES = [
  'Electronics',
  'Fashion',
  'Beauty',
  'Jewelry',
  'Grocery',
  'Health',
  'Sports',
  'Toys',
  'Books',
  'Home',
] as const;

export type ProductType = typeof PRODUCT_TYPES[number];
