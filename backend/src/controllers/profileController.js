const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const logActivity = require('../middleware/activityLogger');

exports.getProfile = async (req, res) => {
  return successResponse(res, req.user);
};

exports.updateProfile = async (req, res, next) => {
  try {
    const allowed = ['firstName', 'lastName', 'phone', 'gender', 'birthDate', 'address', 'position'];
    const updates = {};
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    if (req.file) updates.profilePicture = `/uploads/profiles/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true })
      .select('-password -refreshToken')
      .populate({ path: 'roleId', populate: { path: 'permissions' } })
      .populate('departmentId', 'name');

    await logActivity(req.user._id, 'PROFILE_UPDATED', req);
    return successResponse(res, user, 'Profile updated');
  } catch (error) {
    next(error);
  }
};

exports.uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) return errorResponse(res, 'No file uploaded', 400);
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { profilePicture: `/uploads/profiles/${req.file.filename}` },
      { new: true }
    )
      .select('-password')
      .populate('roleId', 'name')
      .populate('departmentId', 'name');

    return successResponse(res, user, 'Profile picture updated');
  } catch (error) {
    next(error);
  }
};
