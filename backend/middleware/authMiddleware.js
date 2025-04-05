/**
 * @file authMiddleware.js
 * @description Middleware for protecting routes using JWT authentication.
 * @module middleware/authMiddleware
 */

const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

/**
 * Middleware to authenticate routes using a JWT token.
 * If valid, attaches the user object to `req.user`.
 *
 * @function protect
 * @param {Object} req - Express request object, expects `Authorization` header with Bearer token.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 * @throws {Error} 401 - If token is missing or invalid.
 * @access Protected
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Decode token to get user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user without password and attach to req
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
