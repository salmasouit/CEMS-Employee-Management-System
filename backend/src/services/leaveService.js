const LeaveRequest = require('../models/LeaveRequest');
const User = require('../models/User');
const Role = require('../models/Role');
const { calculateLeaveDays } = require('../utils/helpers');
const { createNotification, notifyUsers } = require('./notificationService');

const getApprovers = async () => {
  const roles = await Role.find({
    name: { $in: ['Administrator', 'HR Manager', 'Project Manager'] },
  });
  const roleIds = roles.map((r) => r._id);
  return User.find({ roleId: { $in: roleIds }, status: 'Active' }).select('_id');
};

const checkLeaveOverlap = async (employeeId, startDate, endDate, excludeId = null) => {
  const query = {
    employeeId,
    status: { $in: ['Pending', 'Approved'] },
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } },
    ],
  };
  if (excludeId) query._id = { $ne: excludeId };
  return LeaveRequest.findOne(query);
};

const notifyApprovers = async (title, message) => {
  const approvers = await getApprovers();
  const ids = approvers.map((a) => a._id);
  await notifyUsers(ids, title, message);
};

const createLeaveRequest = async (data, employeeId) => {
  const { startDate, endDate } = data;
  if (new Date(startDate) > new Date(endDate)) {
    throw Object.assign(new Error('Start date must be before end date'), { statusCode: 400 });
  }
  if (new Date(startDate) < new Date().setHours(0, 0, 0, 0)) {
    throw Object.assign(new Error('Start date cannot be in the past'), { statusCode: 400 });
  }

  const overlap = await checkLeaveOverlap(employeeId, startDate, endDate);
  if (overlap) {
    throw Object.assign(new Error('Leave dates overlap with an existing request'), { statusCode: 409 });
  }

  const totalDays = calculateLeaveDays(startDate, endDate);
  const leave = await LeaveRequest.create({
    ...data,
    employeeId,
    totalDays,
    status: 'Pending',
  });

  await notifyApprovers('New Leave Request', `A new leave request has been submitted and is pending approval.`);
  return leave;
};

const reviewLeaveRequest = async (id, status, approverId, comment = '') => {
  const leave = await LeaveRequest.findById(id).populate('employeeId', 'firstName lastName email');
  if (!leave) throw Object.assign(new Error('Leave request not found'), { statusCode: 404 });
  if (leave.status !== 'Pending') {
    throw Object.assign(new Error('Only pending requests can be reviewed'), { statusCode: 400 });
  }

  leave.status = status;
  leave.approvedBy = approverId;
  leave.managerComment = comment;
  leave.reviewedAt = new Date();
  await leave.save();

  const action = status === 'Approved' ? 'approved' : 'rejected';
  await createNotification(
    leave.employeeId._id,
    `Leave Request ${status}`,
    `Your leave request has been ${action}.${comment ? ` Comment: ${comment}` : ''}`
  );

  return leave;
};

const cancelLeaveRequest = async (id, userId) => {
  const leave = await LeaveRequest.findById(id);
  if (!leave) throw Object.assign(new Error('Leave request not found'), { statusCode: 404 });
  if (leave.employeeId.toString() !== userId.toString()) {
    throw Object.assign(new Error('You can only cancel your own requests'), { statusCode: 403 });
  }
  if (leave.status !== 'Pending') {
    throw Object.assign(new Error('Only pending requests can be cancelled'), { statusCode: 400 });
  }

  leave.status = 'Cancelled';
  leave.cancelledAt = new Date();
  await leave.save();
  return leave;
};

module.exports = {
  createLeaveRequest,
  reviewLeaveRequest,
  cancelLeaveRequest,
  getApprovers,
};
