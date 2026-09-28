const ActivityLog = require('../models/ActivityLog');
const { successResponse, getPagination, buildMeta } = require('../utils/apiResponse');

exports.getActivityLogs = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query.page, req.query.limit);
    const filter = {};
    if (req.query.user) filter.userId = req.query.user;
    if (req.query.action) filter.action = { $regex: req.query.action, $options: 'i' };
    if (req.query.from || req.query.to) {
      filter.createdAt = {};
      if (req.query.from) filter.createdAt.$gte = new Date(req.query.from);
      if (req.query.to) filter.createdAt.$lte = new Date(req.query.to);
    }

    const [logs, total] = await Promise.all([
      ActivityLog.find(filter)
        .populate('userId', 'firstName lastName email employeeId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ActivityLog.countDocuments(filter),
    ]);

    return successResponse(res, logs, 'Activity logs retrieved', 200, buildMeta(total, page, limit));
  } catch (error) {
    next(error);
  }
};
