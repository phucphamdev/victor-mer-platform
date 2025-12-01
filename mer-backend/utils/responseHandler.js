const { HTTP_STATUS, MESSAGES } = require('./constants');

/**
 * Standardized API Response Handler
 * Provides consistent response format across all endpoints
 */

class ResponseHandler {
  /**
   * Success response
   */
  static success(res, data = null, message = MESSAGES.SUCCESS, statusCode = HTTP_STATUS.OK) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Created response
   */
  static created(res, data = null, message = MESSAGES.CREATED) {
    return this.success(res, data, message, HTTP_STATUS.CREATED);
  }

  /**
   * Error response
   */
  static error(res, message = MESSAGES.SERVER_ERROR, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, errors = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(errors && { errors }),
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Validation error response
   */
  static validationError(res, errors) {
    return this.error(res, MESSAGES.VALIDATION_ERROR, HTTP_STATUS.UNPROCESSABLE_ENTITY, errors);
  }

  /**
   * Not found response
   */
  static notFound(res, message = MESSAGES.NOT_FOUND) {
    return this.error(res, message, HTTP_STATUS.NOT_FOUND);
  }

  /**
   * Unauthorized response
   */
  static unauthorized(res, message = MESSAGES.UNAUTHORIZED) {
    return this.error(res, message, HTTP_STATUS.UNAUTHORIZED);
  }

  /**
   * Forbidden response
   */
  static forbidden(res, message = MESSAGES.FORBIDDEN) {
    return this.error(res, message, HTTP_STATUS.FORBIDDEN);
  }

  /**
   * Paginated response
   */
  static paginated(res, data, pagination, message = MESSAGES.SUCCESS) {
    return res.status(HTTP_STATUS.OK).json({
      success: true,
      message,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.limit),
      },
      timestamp: new Date().toISOString(),
    });
  }
}

module.exports = ResponseHandler;
