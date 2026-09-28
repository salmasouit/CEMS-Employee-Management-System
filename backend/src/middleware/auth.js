const User = require('../models/User');
const { verifyAccessToken } = require('../utils/jwt');
const { errorResponse } = require('../utils/apiResponse');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication required', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);

    const user = await User.findById(decoded.id)
      .select('-password -refreshToken -passwordResetToken -passwordResetExpires')
      .populate({ path: 'roleId', populate: { path: 'permissions' } })
      .populate('departmentId', 'name');

    if (!user) return errorResponse(res, 'User not found', 401);
    if (user.status === 'Inactive') return errorResponse(res, 'Account is inactive', 403);

    req.user = user;
    next();
  } catch (error) {
    return errorResponse(res, 'Invalid or expired token', 401);
  }
};

module.exports = authenticate;
