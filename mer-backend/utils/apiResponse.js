/**
 * Standardized API Response utility following Google API Design Guide
 */
class ApiResponse {
  /**
   * Success response with data
   */
  static success(res, { data, message = 'Success', statusCode = 200, meta = null }) {
    const response = {
      success: true,
      message,
      data
    };

    if (meta) {
      response.meta = meta;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Success response for list/collection with pagination
   */
  static successWithPagination(res, { data, message = 'Success', pagination, statusCode = 200 }) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      pagination
    });
  }

  /**
   * Created response (201)
   */
  static created(res, { data, message = 'Resource created successfully' }) {
    return this.success(res, { data, message, statusCode: 201 });
  }

  /**
   * No content response (204)
   */
  static noContent(res) {
    return res.status(204).send();
  }

  /**
   * Error response
   */
  static error(res, { message = 'An error occurred', statusCode = 500, errors = null }) {
    const response = {
      success: false,
      message
    };

    if (errors) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Validation error response (400)
   */
  static validationError(res, { errors, message = 'Validation Error' }) {
    return this.error(res, { message, statusCode: 400, errors });
  }

  /**
   * Not found response (404)
   */
  static notFound(res, { message = 'Resource not found' }) {
    return this.error(res, { message, statusCode: 404 });
  }

  /**
   * Unauthorized response (401)
   */
  static unauthorized(res, { message = 'Unauthorized' }) {
    return this.error(res, { message, statusCode: 401 });
  }

  /**
   * Forbidden response (403)
   */
  static forbidden(res, { message = 'Forbidden' }) {
    return this.error(res, { message, statusCode: 403 });
  }
}

module.exports = ApiResponse;
