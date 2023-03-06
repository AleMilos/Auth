/**
 * General utilities
 * @module generalUtils
 */

/**
 *
 * @param {function} fn
 * @returns {Promise}
 *
 * High Order Function that takes a fn as input, and resolves/ catches
 * the state of the inner function.
 * All the Errors of inner functions are sent with the .catch(next)
 * to the listening errorMiddleware in server.js
 */
const asyncHandler = (fn) => async (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { asyncHandler };
