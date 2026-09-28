const { body } = require('express-validator');

const passwordRules = body('password')
  .isLength({ min: 8 })
  .withMessage('Password must be at least 8 characters')
  .matches(/[A-Z]/)
  .withMessage('Password must contain an uppercase letter')
  .matches(/[a-z]/)
  .withMessage('Password must contain a lowercase letter')
  .matches(/[0-9]/)
  .withMessage('Password must contain a number')
  .matches(/[^A-Za-z0-9]/)
  .withMessage('Password must contain a special character');

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
];

const forgotPasswordValidation = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
];

const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Token is required'),
  passwordRules,
  body('confirmPassword').custom((val, { req }) => {
    if (val !== req.body.password) throw new Error('Passwords do not match');
    return true;
  }),
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  passwordRules,
  body('confirmPassword').custom((val, { req }) => {
    if (val !== req.body.password) throw new Error('Passwords do not match');
    return true;
  }),
];

const employeeValidation = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional().matches(/^[+]?[\d\s-()]{8,20}$/).withMessage('Invalid phone number'),
  body('gender').optional().isIn(['Male', 'Female', 'Other']),
  body('status').optional().isIn(['Active', 'Inactive']),
  body('roleId').notEmpty().withMessage('Role is required'),
];

const departmentValidation = [
  body('name').trim().notEmpty().withMessage('Department name is required'),
  body('description').optional().trim(),
];

const roleValidation = [
  body('name').trim().notEmpty().withMessage('Role name is required'),
  body('description').optional().trim(),
  body('permissions').optional().isArray(),
];

const leaveValidation = [
  body('leaveType')
    .isIn(['Annual Leave', 'Sick Leave', 'Emergency Leave', 'Maternity Leave', 'Unpaid Leave'])
    .withMessage('Invalid leave type'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('reason').trim().notEmpty().withMessage('Reason is required'),
];

module.exports = {
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
  employeeValidation,
  departmentValidation,
  roleValidation,
  leaveValidation,
  passwordRules,
};
