/**
 * Middleware to manage raised errors in the applicaiton
 * @module errorMiddleware
 */

/**
 *
 * @param {Error} err - Thrown Error
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {CallbackFunction} next - next callback
 * @desc Error Handler
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode < 400 ? 500 : res.statusCode;

  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
