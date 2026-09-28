const User = require('../models/User');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../utils/jwt');
const { generateResetToken, hashToken } = require('../utils/helpers');
const { successResponse, errorResponse } = require('../utils/apiResponse');
const { sendPasswordResetEmail } = require('../services/emailService');
const { createNotification } = require('../services/notificationService');
const logActivity = require('../middleware/activityLogger');

const setRefreshCookie = (res, token, rememberMe) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 7 * 24 * 60 * 60 * 1000,
  });
};

const populateUser = (query) =>
  query
    .populate({ path: 'roleId', populate: { path: 'permissions' } })
    .populate('departmentId', 'name');

exports.login = async (req, res, next) => {
  try {
    const { email, password, rememberMe } = req.body;
    const user = await User.findOne({ email }).select('+password').populate({
      path: 'roleId',
      populate: { path: 'permissions' },
    }).populate('departmentId', 'name');

    if (!user || !(await user.comparePassword(password))) {
      return errorResponse(res, 'Invalid email or password', 401);
    }
    if (user.status === 'Inactive') {
      return errorResponse(res, 'Account is inactive', 403);
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id, rememberMe);
    user.refreshToken = refreshToken;
    user.lastLoginAt = new Date();
    await user.save();

    setRefreshCookie(res, refreshToken, rememberMe);
    await logActivity(user._id, 'LOGIN', req);

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return successResponse(res, { user: userObj, accessToken }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { refreshToken: null });
    res.clearCookie('refreshToken');
    await logActivity(req.user._id, 'LOGOUT', req);
    return successResponse(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken || req.body.refreshToken;
    if (!token) return errorResponse(res, 'Refresh token required', 401);

    const decoded = verifyRefreshToken(token);
    const user = await User.findById(decoded.id).select('+refreshToken');
    if (!user || user.refreshToken !== token) {
      return errorResponse(res, 'Invalid refresh token', 401);
    }

    const accessToken = generateAccessToken(user._id);
    return successResponse(res, { accessToken }, 'Token refreshed');
  } catch (error) {
    return errorResponse(res, 'Invalid refresh token', 401);
  }
};

exports.getMe = async (req, res) => {
  return successResponse(res, req.user, 'Profile retrieved');
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+passwordResetToken +passwordResetExpires');
    if (!user) {
      return successResponse(res, null, 'If the email exists, a reset link has been sent');
    }

    const { token, hashed } = generateResetToken();
    user.passwordResetToken = hashed;
    user.passwordResetExpires = Date.now() + 3600000;
    await user.save();

    await sendPasswordResetEmail(user.email, token);
    return successResponse(res, null, 'If the email exists, a reset link has been sent');
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const hashed = hashToken(req.body.token);
    const user = await User.findOne({
      passwordResetToken: hashed,
      passwordResetExpires: { $gt: Date.now() },
    }).select('+passwordResetToken +passwordResetExpires');

    if (!user) return errorResponse(res, 'Invalid or expired reset token', 400);

    user.password = req.body.password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.refreshToken = null;
    await user.save();

    await logActivity(user._id, 'PASSWORD_RESET', req);
    return successResponse(res, null, 'Password reset successful');
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('+password');
    const { currentPassword, password } = req.body;

    if (!(await user.comparePassword(currentPassword))) {
      return errorResponse(res, 'Current password is incorrect', 400);
    }

    user.password = password;
    user.refreshToken = null;
    await user.save();

    await logActivity(user._id, 'PASSWORD_CHANGED', req);
    await createNotification(user._id, 'Password Changed', 'Your password was changed successfully.');
    return successResponse(res, null, 'Password changed successfully');
  } catch (error) {
    next(error);
  }
};
