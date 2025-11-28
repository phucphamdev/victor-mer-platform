const jwt = require("jsonwebtoken");
const { secret } = require("../config/secret");

/**
 * Generate Access Token (short-lived)
 * Used for API authentication
 * Expires in 15 minutes for better security
 */
exports.generateToken = (userInfo) => {
  const payload = {
    _id: userInfo._id,
    name: userInfo.name,
    email: userInfo.email,
    role: userInfo.role,
  };

  const token = jwt.sign(payload, secret.token_secret, {
    expiresIn: "15m", // Short-lived access token
  });

  return token;
};

/**
 * Generate Refresh Token (long-lived)
 * Used to get new access tokens without re-login
 * Expires in 7 days
 */
exports.generateRefreshToken = (userInfo) => {
  const payload = {
    _id: userInfo._id,
    email: userInfo.email,
    type: 'refresh' // Mark as refresh token
  };

  const refreshToken = jwt.sign(payload, secret.refresh_token_secret, {
    expiresIn: "7d", // Long-lived refresh token
  });

  return refreshToken;
};

/**
 * Verify Refresh Token
 * Returns decoded payload if valid
 */
exports.verifyRefreshToken = (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, secret.refresh_token_secret);
    if (decoded.type !== 'refresh') {
      throw new Error('Invalid token type');
    }
    return decoded;
  } catch (error) {
    throw error;
  }
};

/**
 * Token for email verification (short-lived)
 * Used for password reset and email confirmation
 */
exports.tokenForVerify = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
    },
    secret.jwt_secret_for_verify,
    { expiresIn: "10m" }
  );
};
