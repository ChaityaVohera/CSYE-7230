/**
 * @file errorMiddleware.js
 * @description Middleware for handling 404 and general application errors.
 * @module middleware/errorMiddleware
 */

/**
 * Middleware to handle 404 Not Found errors.
 *
 * @function notFound
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * General error-handling middleware for Express.
 * Returns error messages in JSON format, including stack trace in development mode.
 *
 * @function errorHandler
 * @param {Object} err - Error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { notFound, errorHandler };
