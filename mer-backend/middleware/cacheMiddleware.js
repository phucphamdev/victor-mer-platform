const { cache } = require('../config/redis');

/**
 * Cache middleware cho API responses
 * @param {number} ttl - Time to live in seconds
 * @param {function} keyGenerator - Function to generate cache key
 */
const cacheMiddleware = (ttl = 300, keyGenerator = null) => {
  return async (req, res, next) => {
    // Chỉ cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    // Generate cache key
    const cacheKey = keyGenerator 
      ? keyGenerator(req) 
      : `cache:${req.originalUrl}`;

    try {
      // Check cache
      const cachedData = await cache.get(cacheKey);
      
      if (cachedData) {
        console.log(`✅ Cache HIT: ${cacheKey}`);
        return res.json(cachedData);
      }

      console.log(`❌ Cache MISS: ${cacheKey}`);

      // Store original res.json
      const originalJson = res.json.bind(res);

      // Override res.json to cache response
      res.json = (data) => {
        // Cache the response
        cache.set(cacheKey, data, ttl).catch(err => {
          console.error('Failed to cache response:', err);
        });

        // Send response
        return originalJson(data);
      };

      next();
    } catch (err) {
      console.error('Cache middleware error:', err);
      next();
    }
  };
};

/**
 * Invalidate cache by pattern
 */
const invalidateCache = async (pattern) => {
  try {
    await cache.delPattern(pattern);
    console.log(`🗑️  Cache invalidated: ${pattern}`);
  } catch (err) {
    console.error('Failed to invalidate cache:', err);
  }
};

module.exports = { cacheMiddleware, invalidateCache };
