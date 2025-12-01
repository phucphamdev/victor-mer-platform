const compression = require('compression');

/**
 * Compression middleware configuration
 * Giảm 60-70% response size
 */
const compressionMiddleware = compression({
  // Compression level (0-9)
  // 6 = balance giữa speed và compression ratio
  level: 6,

  // Chỉ compress response > 1KB
  threshold: 1024,

  // Filter function
  filter: (req, res) => {
    // Không compress nếu client request
    if (req.headers['x-no-compression']) {
      return false;
    }

    // Không compress nếu response đã compressed
    if (res.getHeader('Content-Encoding')) {
      return false;
    }

    // Sử dụng default compression filter
    return compression.filter(req, res);
  },

  // Memory level (1-9)
  // 8 = default, balance giữa memory và speed
  memLevel: 8,

  // Strategy
  // Z_DEFAULT_STRATEGY = 0 (default)
  strategy: 0
});

module.exports = compressionMiddleware;
