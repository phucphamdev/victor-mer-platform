const { secret } = require('../config/secret');
const ApiError = require('../errors/api-error');
const handleCastError = require('../errors/handle-cast-error');
const handleValidationError = require('../errors/handle-validation-error');
const logger = require('../utils/logger');

const globalErrorHandler = (error, req, res, next) => {
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages = [];

  // Log error details
  logger.error('Global error handler caught error', {
    error: error.message,
    stack: error.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
  });

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error?.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
    errorMessages = [{ path: '', message: 'Invalid token' }];
  } else if (error?.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
    errorMessages = [{ path: '', message: 'Token expired' }];
  } else if (error?.code === 11000) {
    // MongoDB duplicate key error
    const field = Object.keys(error.keyPattern)[0];
    statusCode = 400;
    message = `Duplicate ${field}`;
    errorMessages = [{ path: field, message: `${field} already exists` }];
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : [];
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    errors: errorMessages,
    stack: secret.env !== 'production' ? error?.stack : undefined,
  });
};

module.exports = globalErrorHandler;
