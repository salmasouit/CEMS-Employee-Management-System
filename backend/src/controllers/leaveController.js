const LeaveRequest = require('../models/LeaveRequest');
const { successResponse, errorResponse, getPagination, buildMeta } = require('../utils/apiResponse');
const {
  createLeaveRequest,
  reviewLeaveRequest,
  cancelLeaveRequest,
} = require('../services/leaveService');
const logActivity = require('../middleware/activityLogger');

exports.getLeaveRequests = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query.page, req.query.limit);
    const filter = {};

    const canManageAll = req.user.roleId.permissions.some((p) =>
      ['manage_leave_requests', 'approve_leave', 'reject_leave'].includes(p.name)
    );

    if (!canManageAll) {
      filter.employeeId = req.user._id;
    } else if (req.query.employee) {
      filter.employeeId = req.query.employee;
    }

    if (req.query.status) filter.status = req.query.status;
    if (req.query.leaveType) filter.leaveType = req.query.leaveType;

    const [requests, total] = await Promise.all([
      LeaveRequest.find(filter)
        .populate('employeeId', 'firstName lastName email employeeId departmentId')
        .populate('approvedBy', 'firstName lastName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      LeaveRequest.countDocuments(filter),
    ]);

    return successResponse(res, requests, 'Leave requests retrieved', 200, buildMeta(total, page, limit));
  } catch (error) {
    next(error);
  }
};

exports.getLeaveRequest = async (req, res, next) => {
  try {
    const request = await LeaveRequest.findById(req.params.id)
      .populate('employeeId', 'firstName lastName email employeeId')
      .populate('approvedBy', 'firstName lastName');

    if (!request) return errorResponse(res, 'Leave request not found', 404);

    const canManage = req.user.roleId.permissions.some((p) =>
      ['manage_leave_requests', 'approve_leave'].includes(p.name)
    );
    if (!canManage && request.employeeId._id.toString() !== req.user._id.toString()) {
      return errorResponse(res, 'Forbidden', 403);
    }

    return successResponse(res, request);
  } catch (error) {
    next(error);
  }
};

exports.createLeaveRequest = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (req.file) data.attachment = `/uploads/leave/${req.file.filename}`;

    const leave = await createLeaveRequest(data, req.user._id);
    const populated = await LeaveRequest.findById(leave._id)
      .populate('employeeId', 'firstName lastName email employeeId');

    await logActivity(req.user._id, 'LEAVE_REQUEST_CREATED', req);
    return successResponse(res, populated, 'Leave request submitted', 201);
  } catch (error) {
    next(error);
  }
};

exports.approveLeave = async (req, res, next) => {
  try {
    const leave = await reviewLeaveRequest(req.params.id, 'Approved', req.user._id, req.body.comment || '');
    await logActivity(req.user._id, 'LEAVE_APPROVED', req);
    return successResponse(res, leave, 'Leave request approved');
  } catch (error) {
    next(error);
  }
};

exports.rejectLeave = async (req, res, next) => {
  try {
    const leave = await reviewLeaveRequest(req.params.id, 'Rejected', req.user._id, req.body.comment || '');
    await logActivity(req.user._id, 'LEAVE_REJECTED', req);
    return successResponse(res, leave, 'Leave request rejected');
  } catch (error) {
    next(error);
  }
};

exports.cancelLeave = async (req, res, next) => {
  try {
    const leave = await cancelLeaveRequest(req.params.id, req.user._id);
    await logActivity(req.user._id, 'LEAVE_CANCELLED', req);
    return successResponse(res, leave, 'Leave request cancelled');
  } catch (error) {
    next(error);
  }
};
