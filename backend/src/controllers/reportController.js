const User = require('../models/User');
const Department = require('../models/Department');
const LeaveRequest = require('../models/LeaveRequest');
const ActivityLog = require('../models/ActivityLog');
const { handleExport } = require('../services/reportService');
const { errorResponse } = require('../utils/apiResponse');

const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '');

exports.exportEmployees = async (req, res, next) => {
  try {
    const format = req.query.format || 'csv';
    const employees = await User.find()
      .populate('departmentId', 'name')
      .populate('roleId', 'name');

    const columns = ['employeeId', 'firstName', 'lastName', 'email', 'phone', 'department', 'role', 'status'];
    const rows = employees.map((e) => ({
      employeeId: e.employeeId,
      firstName: e.firstName,
      lastName: e.lastName,
      email: e.email,
      phone: e.phone || '',
      department: e.departmentId?.name || '',
      role: e.roleId?.name || '',
      status: e.status,
    }));

    await handleExport(res, format, 'employees-report', columns, rows);
  } catch (error) {
    next(error);
  }
};

exports.exportDepartments = async (req, res, next) => {
  try {
    const format = req.query.format || 'csv';
    const departments = await Department.find().populate('managerId', 'firstName lastName');

    const columns = ['name', 'description', 'manager', 'createdAt'];
    const rows = departments.map((d) => ({
      name: d.name,
      description: d.description || '',
      manager: d.managerId ? `${d.managerId.firstName} ${d.managerId.lastName}` : '',
      createdAt: formatDate(d.createdAt),
    }));

    await handleExport(res, format, 'departments-report', columns, rows);
  } catch (error) {
    next(error);
  }
};

exports.exportLeaveRequests = async (req, res, next) => {
  try {
    const format = req.query.format || 'csv';
    const requests = await LeaveRequest.find()
      .populate('employeeId', 'firstName lastName employeeId')
      .populate('approvedBy', 'firstName lastName');

    const columns = ['employee', 'leaveType', 'startDate', 'endDate', 'totalDays', 'status', 'reason'];
    const rows = requests.map((r) => ({
      employee: r.employeeId ? `${r.employeeId.firstName} ${r.employeeId.lastName}` : '',
      leaveType: r.leaveType,
      startDate: formatDate(r.startDate),
      endDate: formatDate(r.endDate),
      totalDays: r.totalDays,
      status: r.status,
      reason: r.reason,
    }));

    await handleExport(res, format, 'leave-requests-report', columns, rows);
  } catch (error) {
    next(error);
  }
};

exports.exportActivityLogs = async (req, res, next) => {
  try {
    const format = req.query.format || 'csv';
    const logs = await ActivityLog.find().populate('userId', 'firstName lastName email');

    const columns = ['user', 'action', 'browser', 'ipAddress', 'date'];
    const rows = logs.map((l) => ({
      user: l.userId ? `${l.userId.firstName} ${l.userId.lastName}` : '',
      action: l.action,
      browser: l.browser,
      ipAddress: l.ipAddress,
      date: formatDate(l.createdAt),
    }));

    await handleExport(res, format, 'activity-logs-report', columns, rows);
  } catch (error) {
    next(error);
  }
};

exports.exportReport = async (req, res, next) => {
  const type = req.params.type;
  const handlers = {
    employees: exports.exportEmployees,
    departments: exports.exportDepartments,
    'leave-requests': exports.exportLeaveRequests,
    'activity-logs': exports.exportActivityLogs,
  };
  const handler = handlers[type];
  if (!handler) return errorResponse(res, 'Invalid report type', 400);
  return handler(req, res, next);
};
