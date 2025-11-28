const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { secret } = require("../config/secret");

/**
 * Authentication Middleware
 * Verifies JWT token from Authorization header
 * 
 * Usage:
 * - Add to routes that require authentication
 * - Token format: Bearer <token>
 * 
 * Steps:
 * 1. Check if token exists in Authorization header
 * 2. If no token, return 401 Unauthorized
 * 3. Verify and decode the token
 * 4. If valid, attach user data to request and proceed
 * 5. If invalid, return 403 Forbidden
 */

module.exports = async (req, res, next) => {
  try {
    // Extract token from Authorization header (format: "Bearer <token>")
    const token = req.headers?.authorization?.split(" ")?.[1];

    if(!token){
      return res.status(401).json({
        success: false,
        status: "fail",
        message: "Authentication required",
        error: "You are not logged in. Please provide a valid authentication token."
      });
    }
    
    // Verify token and decode payload
    const decoded = await promisify(jwt.verify)(token, secret.token_secret);

    // Attach user information to request object
    req.user = decoded;

    next();

  } catch (error) {
    // Handle token verification errors
    const errorMessage = error.name === 'TokenExpiredError' 
      ? 'Token has expired. Please login again.'
      : 'Invalid token. Please provide a valid authentication token.';
    
    res.status(403).json({
      success: false,
      status: "fail",
      message: "Authentication failed",
      error: errorMessage
    });
  }
};