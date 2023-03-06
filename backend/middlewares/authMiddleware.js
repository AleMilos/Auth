const jsonwebtoken = require("jsonwebtoken");
const { asyncHandler } = require("../utils/generalUtils");
const User = require("../models/userModel");

/**
 * Middleware to check user token
 * @module authMiddleware
 */

/**
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {CallbackFunction} next - next callback
 * @desc   Read Authentication header and check Bearer Token. If the user is succesfully found, call the next() middleware function
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if Bearer is in request headers authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from the header
      token = req.headers.authorization.split(" ")[1];
      // reverse the token with the SECRET
      const decoded = jsonwebtoken.verify(token, process.env.SECRET);
      // get the user from DB removing the password from the result
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not Authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = { protect };
