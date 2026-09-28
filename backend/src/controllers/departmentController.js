const Department = require('../models/Department');
const User = require('../models/User');
const { successResponse, errorResponse, getPagination, buildMeta } = require('../utils/apiResponse');
const logActivity = require('../middleware/activityLogger');

exports.getDepartments = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query.page, req.query.limit);
    const filter = {};
    if (req.query.search) filter.name = { $regex: req.query.search, $options: 'i' };

    const [departments, total] = await Promise.all([
      Department.find(filter)
        .populate('managerId', 'firstName lastName email employeeId')
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit),
      Department.countDocuments(filter),
    ]);

    return successResponse(res, departments, 'Departments retrieved', 200, buildMeta(total, page, limit));
  } catch (error) {
    next(error);
  }
};

exports.getAllDepartments = async (_req, res, next) => {
  try {
    const departments = await Department.find().sort({ name: 1 });
    return successResponse(res, departments);
  } catch (error) {
    next(error);
  }
};

exports.getDepartment = async (req, res, next) => {
  try {
    const department = await Department.findById(req.params.id).populate(
      'managerId',
      'firstName lastName email'
    );
    if (!department) return errorResponse(res, 'Department not found', 404);
    return successResponse(res, department);
  } catch (error) {
    next(error);
  }
};

exports.createDepartment = async (req, res, next) => {
  try {
    const department = await Department.create(req.body);
    await logActivity(req.user._id, 'DEPARTMENT_CREATED', req);
    return successResponse(res, department, 'Department created', 201);
  } catch (error) {
    next(error);
  }
};

exports.updateDepartment = async (req, res, next) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('managerId', 'firstName lastName email');
    if (!department) return errorResponse(res, 'Department not found', 404);
    await logActivity(req.user._id, 'DEPARTMENT_UPDATED', req);
    return successResponse(res, department, 'Department updated');
  } catch (error) {
    next(error);
  }
};

exports.deleteDepartment = async (req, res, next) => {
  try {
    const employeeCount = await User.countDocuments({ departmentId: req.params.id });
    if (employeeCount > 0) {
      return errorResponse(res, 'Cannot delete department with assigned employees', 409);
    }
    const department = await Department.findByIdAndDelete(req.params.id);
    if (!department) return errorResponse(res, 'Department not found', 404);
    await logActivity(req.user._id, 'DEPARTMENT_DELETED', req);
    return successResponse(res, null, 'Department deleted');
  } catch (error) {
    next(error);
  }
};
