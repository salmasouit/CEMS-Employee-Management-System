const Role = require('../models/Role');
const User = require('../models/User');
const Permission = require('../models/Permission');
const { successResponse, errorResponse, getPagination, buildMeta } = require('../utils/apiResponse');
const logActivity = require('../middleware/activityLogger');

exports.getRoles = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req.query.page, req.query.limit);
    const filter = {};
    if (req.query.search) filter.name = { $regex: req.query.search, $options: 'i' };

    const [roles, total] = await Promise.all([
      Role.find(filter).populate('permissions').sort({ name: 1 }).skip(skip).limit(limit),
      Role.countDocuments(filter),
    ]);

    return successResponse(res, roles, 'Roles retrieved', 200, buildMeta(total, page, limit));
  } catch (error) {
    next(error);
  }
};

exports.getAllRoles = async (_req, res, next) => {
  try {
    const roles = await Role.find().populate('permissions').sort({ name: 1 });
    return successResponse(res, roles);
  } catch (error) {
    next(error);
  }
};

exports.getRole = async (req, res, next) => {
  try {
    const role = await Role.findById(req.params.id).populate('permissions');
    if (!role) return errorResponse(res, 'Role not found', 404);
    return successResponse(res, role);
  } catch (error) {
    next(error);
  }
};

exports.createRole = async (req, res, next) => {
  try {
    const role = await Role.create(req.body);
    const populated = await Role.findById(role._id).populate('permissions');
    await logActivity(req.user._id, 'ROLE_CREATED', req);
    return successResponse(res, populated, 'Role created', 201);
  } catch (error) {
    next(error);
  }
};

exports.updateRole = async (req, res, next) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('permissions');
    if (!role) return errorResponse(res, 'Role not found', 404);
    await logActivity(req.user._id, 'ROLE_UPDATED', req);
    return successResponse(res, role, 'Role updated');
  } catch (error) {
    next(error);
  }
};

exports.deleteRole = async (req, res, next) => {
  try {
    const userCount = await User.countDocuments({ roleId: req.params.id });
    if (userCount > 0) {
      return errorResponse(res, 'Cannot delete role assigned to employees', 409);
    }
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return errorResponse(res, 'Role not found', 404);
    await logActivity(req.user._id, 'ROLE_DELETED', req);
    return successResponse(res, null, 'Role deleted');
  } catch (error) {
    next(error);
  }
};

exports.getPermissions = async (_req, res, next) => {
  try {
    const permissions = await Permission.find().sort({ name: 1 });
    return successResponse(res, permissions);
  } catch (error) {
    next(error);
  }
};
