const redis = require('redis');

// Tạo Redis client
const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379',
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 10) {
        console.error('Redis: Too many reconnection attempts');
        return new Error('Redis reconnection failed');
      }
      return retries * 100; // Exponential backoff
    }
  }
});

// Error handling
client.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

client.on('connect', () => {
  console.log('✅ Redis connected successfully');
});

client.on('ready', () => {
  console.log('✅ Redis ready to use');
});

// Connect to Redis
(async () => {
  try {
    await client.connect();
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
})();

// Cache helper functions
const cache = {
  // Get cached data
  async get(key) {
    try {
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (err) {
      console.error('Redis GET error:', err);
      return null;
    }
  },

  // Set cache with TTL (seconds)
  async set(key, value, ttl = 300) {
    try {
      await client.setEx(key, ttl, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error('Redis SET error:', err);
      return false;
    }
  },

  // Delete cache
  async del(key) {
    try {
      await client.del(key);
      return true;
    } catch (err) {
      console.error('Redis DEL error:', err);
      return false;
    }
  },

  // Delete multiple keys by pattern
  async delPattern(pattern) {
    try {
      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        await client.del(keys);
      }
      return true;
    } catch (err) {
      console.error('Redis DEL PATTERN error:', err);
      return false;
    }
  },

  // Check if key exists
  async exists(key) {
    try {
      return await client.exists(key);
    } catch (err) {
      console.error('Redis EXISTS error:', err);
      return false;
    }
  }
};

// Cache strategies với TTL khác nhau
const CACHE_TTL = {
  PRODUCTS_LIST: 300,      // 5 phút
  PRODUCT_DETAIL: 600,     // 10 phút
  CATEGORIES: 1800,        // 30 phút
  BRANDS: 1800,            // 30 phút
  USER_SESSION: 86400,     // 24 giờ
  POPULAR_PRODUCTS: 600,   // 10 phút
  SEARCH_RESULTS: 300,     // 5 phút
  CART: 3600,              // 1 giờ
};

module.exports = { client, cache, CACHE_TTL };
