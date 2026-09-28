const { errorResponse } = require('../utils/apiResponse');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({ msg: e.message }));
    return errorResponse(res, 'Validation error', 422, errors);
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(res, `${field} already exists`, 409);
  }

  if (err.name === 'CastError') {
    return errorResponse(res, 'Invalid ID format', 400);
  }

  if (err.message === 'Invalid file type') {
    return errorResponse(res, err.message, 400);
  }

  return errorResponse(res, err.message || 'Internal server error', err.statusCode || 500);
};

module.exports = errorHandler;
