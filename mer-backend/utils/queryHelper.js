/**
 * Query Helper Utilities
 * Common database query operations
 */

const { PAGINATION } = require('../config/constants');

/**
 * Build pagination options
 */
exports.buildPaginationOptions = (query) => {
  const page = parseInt(query.page) || PAGINATION.DEFAULT_PAGE;
  const limit = Math.min(
    parseInt(query.limit) || PAGINATION.DEFAULT_LIMIT,
    PAGINATION.MAX_LIMIT
  );
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Build sort options
 */
exports.buildSortOptions = (query) => {
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = query.sortOrder === 'asc' ? 1 : -1;
  
  return { [sortBy]: sortOrder };
};

/**
 * Build search filter
 */
exports.buildSearchFilter = (searchTerm, fields) => {
  if (!searchTerm) return {};

  const searchRegex = new RegExp(searchTerm, 'i');
  
  return {
    $or: fields.map(field => ({ [field]: searchRegex }))
  };
};

/**
 * Build date range filter
 */
exports.buildDateRangeFilter = (startDate, endDate, field = 'createdAt') => {
  const filter = {};

  if (startDate || endDate) {
    filter[field] = {};
    if (startDate) filter[field].$gte = new Date(startDate);
    if (endDate) filter[field].$lte = new Date(endDate);
  }

  return filter;
};

/**
 * Build pagination response
 */
exports.buildPaginationResponse = (data, total, page, limit) => {
  const totalPages = Math.ceil(total / limit);
  
  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

/**
 * Sanitize query parameters
 */
exports.sanitizeQuery = (query) => {
  const sanitized = {};
  
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') {
      sanitized[key] = value;
    }
  }
  
  return sanitized;
};
