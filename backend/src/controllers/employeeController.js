const User = require('../models/User');
const Role = require('../models/Role');
const { generateEmployeeId } = require('../utils/helpers');
const { successResponse, errorResponse, getPagination, buildMeta } = require('../utils/apiResponse');
const { createNotification } = require('../services/notificationService');
const logActivity = require('../middleware/activityLogger');

const buildEmployeeQuery = (query) => {
  const filter = {};
  if (query.search) {
    filter.$or = [
      { firstName: { $regex: query.search, $options: 'i' } },
      { lastName: { $regex: query.search, $options: 'i' } },
      { email: { $regex: query.search, $options: 'i' } },
      { employeeId: { $regex: query.search, $options: 'i' } },
    ];
  }
  if (query.department) filter.departmentId = query.department;
  if (query.role) filter.roleId = query.role;
  if (query.status) filter.status = query.status;
  if (query.gender) filter.gender = query.gender;
  return filter;
};

exports.getEmployees = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query.page, req.query.limit);
    const filter = buildEmployeeQuery(req.query);
    const sortField = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

    const [employees, total] = await Promise.all([
      User.find(filter)
        .select('-password -refreshToken')
        .populate('departmentId', 'name')
        .populate('roleId', 'name')
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit),
      User.countDocuments(filter),
    ]);

    return successResponse(res, employees, 'Employees retrieved', 200, buildMeta(total, page, limit));
  } catch (error) {
    next(error);
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const employee = await User.findById(req.params.id)
      .select('-password -refreshToken')
      .populate('departmentId', 'name')
      .populate({ path: 'roleId', populate: { path: 'permissions' } });

    if (!employee) return errorResponse(res, 'Employee not found', 404);
    return successResponse(res, employee);
  } catch (error) {
    next(error);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const employeeId = req.body.employeeId || (await generateEmployeeId(User));
    const role = await Role.findById(req.body.roleId);
    if (!role) return errorResponse(res, 'Invalid role', 400);

    const data = { ...req.body, employeeId };
    if (req.file) data.profilePicture = `/uploads/profiles/${req.file.filename}`;

    const employee = await User.create(data);
    const populated = await User.findById(employee._id)
      .select('-password')
      .populate('departmentId', 'name')
      .populate('roleId', 'name');

    await logActivity(req.user._id, 'EMPLOYEE_CREATED', req);
    await createNotification(employee._id, 'Welcome to CEMS', 'Your employee account has been created.');

    return successResponse(res, populated, 'Employee created', 201);
  } catch (error) {
    next(error);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    delete updates.password;
    if (req.file) updates.profilePicture = `/uploads/profiles/${req.file.filename}`;

    const employee = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    })
      .select('-password')
      .populate('departmentId', 'name')
      .populate('roleId', 'name');

    if (!employee) return errorResponse(res, 'Employee not found', 404);
    await logActivity(req.user._id, 'EMPLOYEE_UPDATED', req);
    return successResponse(res, employee, 'Employee updated');
  } catch (error) {
    next(error);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    const employee = await User.findByIdAndDelete(req.params.id);
    if (!employee) return errorResponse(res, 'Employee not found', 404);
    await logActivity(req.user._id, 'EMPLOYEE_DELETED', req);
    return successResponse(res, null, 'Employee deleted');
  } catch (error) {
    next(error);
  }
};

exports.uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) return errorResponse(res, 'No file uploaded', 400);
    const employee = await User.findByIdAndUpdate(
      req.params.id,
      { profilePicture: `/uploads/profiles/${req.file.filename}` },
      { new: true }
    ).select('-password');
    if (!employee) return errorResponse(res, 'Employee not found', 404);
    return successResponse(res, employee, 'Profile picture updated');
  } catch (error) {
    next(error);
  }
};
