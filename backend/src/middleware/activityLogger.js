const ActivityLog = require('../models/ActivityLog');

const logActivity = async (userId, action, req) => {
  try {
    await ActivityLog.create({
      userId,
      action,
      browser: req.headers['user-agent'] || '',
      ipAddress: req.ip || req.connection?.remoteAddress || '',
    });
  } catch (err) {
    console.error('Activity log error:', err.message);
  }
};

module.exports = logActivity;
