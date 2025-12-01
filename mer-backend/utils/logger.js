const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log levels
const LOG_LEVELS = {
  ERROR: 'ERROR',
  WARN: 'WARN',
  INFO: 'INFO',
  DEBUG: 'DEBUG',
};

// Colors for console output
const COLORS = {
  ERROR: '\x1b[31m', // Red
  WARN: '\x1b[33m',  // Yellow
  INFO: '\x1b[36m',  // Cyan
  DEBUG: '\x1b[35m', // Magenta
  RESET: '\x1b[0m',
};

class Logger {
  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  /**
   * Format log message
   */
  formatMessage(level, message, meta = {}) {
    const timestamp = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const metaStr = Object.keys(meta).length > 0 ? JSON.stringify(meta) : '';
    return `[${timestamp}] [${level}] ${message} ${metaStr}`.trim();
  }

  /**
   * Write to log file
   */
  writeToFile(level, message, meta) {
    const logFile = path.join(logsDir, `${level.toLowerCase()}-${dayjs().format('YYYY-MM-DD')}.log`);
    const formattedMessage = this.formatMessage(level, message, meta);
    
    fs.appendFile(logFile, formattedMessage + '\n', (err) => {
      if (err) console.error('Failed to write to log file:', err);
    });
  }

  /**
   * Log to console with colors
   */
  logToConsole(level, message, meta) {
    const color = COLORS[level] || COLORS.RESET;
    const formattedMessage = this.formatMessage(level, message, meta);
    console.log(`${color}${formattedMessage}${COLORS.RESET}`);
  }

  /**
   * Main log method
   */
  log(level, message, meta = {}) {
    // Always write to file in production
    if (!this.isDevelopment) {
      this.writeToFile(level, message, meta);
    }

    // Console output
    if (this.isDevelopment || level === LOG_LEVELS.ERROR) {
      this.logToConsole(level, message, meta);
    }
  }

  /**
   * Error logging
   */
  error(message, error = null) {
    const meta = error ? {
      message: error.message,
      stack: error.stack,
      ...(error.code && { code: error.code }),
    } : {};
    this.log(LOG_LEVELS.ERROR, message, meta);
  }

  /**
   * Warning logging
   */
  warn(message, meta = {}) {
    this.log(LOG_LEVELS.WARN, message, meta);
  }

  /**
   * Info logging
   */
  info(message, meta = {}) {
    this.log(LOG_LEVELS.INFO, message, meta);
  }

  /**
   * Debug logging (only in development)
   */
  debug(message, meta = {}) {
    if (this.isDevelopment) {
      this.log(LOG_LEVELS.DEBUG, message, meta);
    }
  }

  /**
   * HTTP request logging
   */
  http(req, res, duration) {
    const message = `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`;
    const meta = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    };
    this.log(LOG_LEVELS.INFO, message, meta);
  }
}

module.exports = new Logger();
