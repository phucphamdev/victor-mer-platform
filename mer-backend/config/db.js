const mongoose = require('mongoose');
const { secret } = require('./secret');
const logger = require('../utils/logger');

mongoose.set('strictQuery', false);

// local url 
const DB_URL = 'mongodb://0.0.0.0:27017/shofy'; 
// mongodb url
const MONGO_URI = secret.db_url;

const connectDB = async () => {
  try { 
    await mongoose.connect(MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    logger.info('✅ MongoDB connected successfully', { uri: MONGO_URI.replace(/\/\/.*@/, '//***@') });
  } catch (err) {
    logger.error('❌ MongoDB connection failed', err);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('disconnected', () => {
  logger.warn('⚠️  MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  logger.error('❌ MongoDB connection error', err);
});

module.exports = connectDB;
