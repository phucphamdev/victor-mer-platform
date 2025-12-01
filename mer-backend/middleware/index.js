/**
 * Middleware Export
 * Central export point for all middleware
 */

const globalErrorHandler = require('./global-error-handler');
const requestLogger = require('./requestLogger');
const validateRequest = require('./validateRequest');
const { isAuth, isAdmin } = require('./authorization');
const verifyToken = require('./verifyToken');
const rateLimiter = require('./rateLimiter');
const cacheMiddleware = require('./cacheMiddleware');

module.exports = {
  globalErrorHandler,
  requestLogger,
  validateRequest,
  isAuth,
  isAdmin,
  verifyToken,
  rateLimiter,
  cacheMiddleware,
};
