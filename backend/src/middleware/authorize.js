const { errorResponse } = require('../utils/apiResponse');

const authorize = (...requiredPermissions) => (req, res, next) => {
  if (!req.user?.roleId?.permissions) {
    return errorResponse(res, 'Forbidden', 403);
  }

  const userPermissions = req.user.roleId.permissions.map((p) => p.name);
  const hasPermission = requiredPermissions.some((p) => userPermissions.includes(p));

  if (!hasPermission) {
    return errorResponse(res, 'You do not have permission to perform this action', 403);
  }

  next();
};

module.exports = authorize;
