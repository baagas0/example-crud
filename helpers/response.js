class ApiResponse {
  static success(data = null, message = "Request processed successfully", pagination = null, statusCode = 200) {
    const response = {
      meta: {
        code: statusCode,
        status: "Success",
        message: message,
        error: null,
        log_code: 0,
        timestamp: new Date().toISOString()
      },
      data: data
    };

    if (pagination) {
      response.pagination = pagination;
    }

    return response;
  }

  static error(message = "Internal server error", error = null, statusCode = 500, logCode = 1) {
    return {
      meta: {
        code: statusCode,
        status: "Error",
        message: message,
        error: error,
        log_code: logCode,
        timestamp: new Date().toISOString()
      },
      data: null,
      pagination: {
        total_data: 0,
        limit: 0,
        total_page: 0,
        current_page: 0
      }
    };
  }

  static paginated(data, totalData, currentPage = 1, limit = 10, message = "Data retrieved successfully") {
    const totalPages = Math.ceil(totalData / limit);

    return {
      meta: {
        code: 200,
        status: "Success",
        message: message,
        error: null,
        log_code: 0,
        timestamp: new Date().toISOString()
      },
      data: data,
      pagination: {
        total_data: totalData,
        limit: limit,
        total_page: totalPages,
        current_page: currentPage
      }
    };
  }

  static notFound(message = "Resource not found") {
    return this.error(message, null, 404, 2);
  }

  static validationError(message = "Validation failed", errors = null) {
    return this.error(message, errors, 400, 3);
  }

  static unauthorized(message = "Unauthorized") {
    return this.error(message, null, 401, 4);
  }

  static forbidden(message = "Forbidden") {
    return this.error(message, null, 403, 5);
  }
}

module.exports = ApiResponse;