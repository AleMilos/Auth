const jsonwebtoken = require("jsonwebtoken");
const { asyncHandler } = require("../utils/generalUtils");
const User = require("../models/userModel");

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
      throw new Error("Not Authorized 1");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized 2");
  }
});

module.exports = { protect };
