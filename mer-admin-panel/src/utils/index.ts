/**
 * Utils Export
 * Central export point for all utility functions
 */

export * from './constants';
export * from './toast';
export { apiClient } from './api';

// Export from helpers (original utilities)
export {
  formatCurrency,
  formatDate,
  truncateText,
  generateSlug,
  debounce,
  isEmpty,
  deepClone,
  getFileExtension,
  formatFileSize,
  isValidEmail,
  isValidPhone,
  calculatePercentage,
  getInitials,
  safeJsonParse,
  generateId,
  groupBy,
} from './helpers';

// Export from format (extended formatting utilities)
export {
  formatNumber,
  formatRelativeTime,
  formatPercentage,
  formatPhoneNumber,
  truncate,
  capitalize,
  titleCase,
  slugify,
  getOrderStatusColor,
  getProductStatusColor,
} from './format';
