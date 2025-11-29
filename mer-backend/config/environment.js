/**
 * Environment Configuration
 * Centralized environment variable management with validation
 */

const { secret } = require('./secret');

class EnvironmentConfig {
  constructor() {
    this.env = process.env.NODE_ENV || 'development';
    this.isDevelopment = this.env === 'development';
    this.isProduction = this.env === 'production';
    this.isTest = this.env === 'test';
    
    // Validate required environment variables
    this.validate();
  }

  /**
   * Validate required environment variables
   */
  validate() {
    const required = [
      'MONGO_URI',
      'TOKEN_SECRET',
    ];

    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0 && this.isProduction) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}`
      );
    }
  }

  /**
   * Get configuration object
   */
  getConfig() {
    return {
      // Environment
      env: this.env,
      isDevelopment: this.isDevelopment,
      isProduction: this.isProduction,
      isTest: this.isTest,

      // Server
      port: secret.port || 7000,
      apiPrefix: '/api',

      // Database
      database: {
        uri: secret.db_url,
        options: {
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        },
      },

      // JWT
      jwt: {
        secret: secret.jwt_secret,
        refreshSecret: secret.jwt_refresh_secret,
        accessTokenExpiry: '15m',
        refreshTokenExpiry: '7d',
      },

      // Redis
      redis: {
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT || '6379'),
        password: process.env.REDIS_PASSWORD,
      },

      // Cloudinary
      cloudinary: {
        cloudName: secret.cloudinary_name,
        apiKey: secret.cloudinary_api_key,
        apiSecret: secret.cloudinary_api_secret,
        uploadPreset: secret.cloudinary_upload_preset,
      },

      // Email
      email: {
        host: process.env.EMAIL_HOST,
        port: parseInt(process.env.EMAIL_PORT || '587'),
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
        from: process.env.EMAIL_FROM || 'noreply@example.com',
      },

      // Stripe
      stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
      },

      // CORS
      cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true,
      },

      // Rate Limiting
      rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
      },

      // File Upload
      upload: {
        maxFileSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
      },

      // Logging
      logging: {
        level: this.isDevelopment ? 'debug' : 'info',
        format: this.isDevelopment ? 'dev' : 'combined',
      },
    };
  }
}

module.exports = new EnvironmentConfig();
