/**
 * Cache Service
 * Centralized caching logic with Redis
 */

const cache = require('../config/redis');
const logger = require('../utils/logger');
const { CACHE_TTL } = require('../config/constants');

class CacheService {
  /**
   * Get cached data
   */
  async get(key) {
    try {
      const data = await cache.get(key);
      if (data) {
        logger.debug(`Cache HIT: ${key}`);
        return data;
      }
      logger.debug(`Cache MISS: ${key}`);
      return null;
    } catch (error) {
      logger.error('Cache get error', error);
      return null;
    }
  }

  /**
   * Set cache with TTL
   */
  async set(key, value, ttl = CACHE_TTL.MEDIUM) {
    try {
      await cache.set(key, value, ttl);
      logger.debug(`Cache SET: ${key} (TTL: ${ttl}s)`);
      return true;
    } catch (error) {
      logger.error('Cache set error', error);
      return false;
    }
  }

  /**
   * Delete cache
   */
  async del(key) {
    try {
      await cache.del(key);
      logger.debug(`Cache DEL: ${key}`);
      return true;
    } catch (error) {
      logger.error('Cache delete error', error);
      return false;
    }
  }

  /**
   * Delete multiple keys by pattern
   */
  async delPattern(pattern) {
    try {
      await cache.delPattern(pattern);
      logger.debug(`Cache DEL PATTERN: ${pattern}`);
      return true;
    } catch (error) {
      logger.error('Cache delete pattern error', error);
      return false;
    }
  }

  /**
   * Get or set cache (cache-aside pattern)
   */
  async getOrSet(key, fetchFn, ttl = CACHE_TTL.MEDIUM) {
    try {
      // Try to get from cache
      const cached = await this.get(key);
      if (cached) {
        return cached;
      }

      // Fetch fresh data
      const data = await fetchFn();
      
      // Store in cache
      await this.set(key, data, ttl);
      
      return data;
    } catch (error) {
      logger.error('Cache getOrSet error', error);
      // Return fresh data even if caching fails
      return await fetchFn();
    }
  }

  /**
   * Invalidate related caches
   */
  async invalidateRelated(patterns) {
    try {
      const promises = patterns.map(pattern => this.delPattern(pattern));
      await Promise.all(promises);
      logger.info(`Invalidated caches: ${patterns.join(', ')}`);
      return true;
    } catch (error) {
      logger.error('Cache invalidate related error', error);
      return false;
    }
  }
}

module.exports = new CacheService();
