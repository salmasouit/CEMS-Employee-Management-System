const User = require('../models/User');
const Department = require('../models/Department');
const Role = require('../models/Role');
const LeaveRequest = require('../models/LeaveRequest');
const ActivityLog = require('../models/ActivityLog');
const { successResponse } = require('../utils/apiResponse');

exports.getDashboardStats = async (_req, res, next) => {
  try {
    const [
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalDepartments,
      totalRoles,
      pendingLeave,
      approvedLeave,
      rejectedLeave,
      recentActivities,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: 'Active' }),
      User.countDocuments({ status: 'Inactive' }),
      Department.countDocuments(),
      Role.countDocuments(),
      LeaveRequest.countDocuments({ status: 'Pending' }),
      LeaveRequest.countDocuments({ status: 'Approved' }),
      LeaveRequest.countDocuments({ status: 'Rejected' }),
      ActivityLog.find()
        .populate('userId', 'firstName lastName')
        .sort({ createdAt: -1 })
        .limit(10),
    ]);

    return successResponse(res, {
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      totalDepartments,
      totalRoles,
      pendingLeave,
      approvedLeave,
      rejectedLeave,
      recentActivities,
    });
  } catch (error) {
    next(error);
  }
};

exports.getDashboardCharts = async (_req, res, next) => {
  try {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    twelveMonthsAgo.setDate(1);
    twelveMonthsAgo.setHours(0, 0, 0, 0);

    const [employeesByDepartment, employeesByRole, monthlyLeave, monthlyActivity] = await Promise.all([
      User.aggregate([
        { $match: { departmentId: { $ne: null } } },
        { $group: { _id: '$departmentId', count: { $sum: 1 } } },
        {
          $lookup: {
            from: 'departments',
            localField: '_id',
            foreignField: '_id',
            as: 'department',
          },
        },
        { $unwind: { path: '$department', preserveNullAndEmptyArrays: true } },
        { $project: { name: { $ifNull: ['$department.name', 'Unassigned'] }, count: 1 } },
      ]),
      User.aggregate([
        { $group: { _id: '$roleId', count: { $sum: 1 } } },
        {
          $lookup: { from: 'roles', localField: '_id', foreignField: '_id', as: 'role' },
        },
        { $unwind: { path: '$role', preserveNullAndEmptyArrays: true } },
        { $project: { name: { $ifNull: ['$role.name', 'Unknown'] }, count: 1 } },
      ]),
      LeaveRequest.aggregate([
        { $match: { createdAt: { $gte: twelveMonthsAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { month: '$_id', count: 1, _id: 0 } },
      ]),
      ActivityLog.aggregate([
        { $match: { createdAt: { $gte: twelveMonthsAgo } } },
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { month: '$_id', count: 1, _id: 0 } },
      ]),
    ]);

    return successResponse(res, {
      employeesByDepartment,
      employeesByRole,
      monthlyLeave,
      monthlyActivity,
    });
  } catch (error) {
    next(error);
  }
};
