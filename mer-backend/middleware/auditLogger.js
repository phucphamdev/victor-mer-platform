const fs = require('fs');
const path = require('path');

/**
 * Audit Logger Middleware
 * Logs important security events and admin actions
 */

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Get log file path for today
const getLogFilePath = () => {
  const today = new Date().toISOString().split('T')[0];
  return path.join(logsDir, `audit-${today}.log`);
};

// Format log entry
const formatLogEntry = (data) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${JSON.stringify(data)}\n`;
};

// Write log to file
const writeLog = (logEntry) => {
  const logFile = getLogFilePath();
  fs.appendFileSync(logFile, logEntry, 'utf8');
};

/**
 * Log authentication events
 */
const logAuth = (action, req, additionalData = {}) => {
  const logData = {
    type: 'AUTH',
    action,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
    email: req.body?.email || additionalData.email,
    userId: req.user?._id || additionalData.userId,
    success: additionalData.success !== undefined ? additionalData.success : true,
    ...additionalData,
  };

  writeLog(formatLogEntry(logData));
  
  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🔐 Audit Log:', logData);
  }
};

/**
 * Log admin actions (CRUD operations)
 */
const logAdminAction = (action, req, resource, additionalData = {}) => {
  const logData = {
    type: 'ADMIN_ACTION',
    action,
    resource,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
    adminId: req.user?._id,
    adminEmail: req.user?.email,
    adminRole: req.user?.role,
    ...additionalData,
  };

  writeLog(formatLogEntry(logData));
  
  if (process.env.NODE_ENV === 'development') {
    console.log('📝 Admin Action:', logData);
  }
};

/**
 * Log security events (suspicious activities)
 */
const logSecurityEvent = (event, req, additionalData = {}) => {
  const logData = {
    type: 'SECURITY',
    event,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.headers['user-agent'],
    url: req.originalUrl,
    method: req.method,
    severity: additionalData.severity || 'medium',
    ...additionalData,
  };

  writeLog(formatLogEntry(logData));
  
  // Always log security events to console
  console.warn('⚠️  Security Event:', logData);
};

/**
 * Middleware to automatically log certain routes
 */
const auditMiddleware = (action, resource) => {
  return (req, res, next) => {
    // Store original send function
    const originalSend = res.send;

    // Override send function to log after response
    res.send = function (data) {
      // Log the action
      logAdminAction(action, req, resource, {
        statusCode: res.statusCode,
        success: res.statusCode < 400,
      });

      // Call original send
      originalSend.call(this, data);
    };

    next();
  };
};

module.exports = {
  logAuth,
  logAdminAction,
  logSecurityEvent,
  auditMiddleware,
};
