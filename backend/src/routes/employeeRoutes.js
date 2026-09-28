const express = require('express');
const employeeController = require('../controllers/employeeController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { employeeValidation, passwordRules } = require('../utils/validators');
const { profileUpload } = require('../config/multer');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize('manage_employees', 'view_employees'), employeeController.getEmployees);
router.get('/:id', authorize('manage_employees', 'view_employees'), employeeController.getEmployee);
router.post(
  '/',
  authorize('manage_employees'),
  profileUpload.single('profilePicture'),
  [...employeeValidation, passwordRules],
  validate,
  employeeController.createEmployee
);
router.put(
  '/:id',
  authorize('manage_employees'),
  profileUpload.single('profilePicture'),
  employeeValidation,
  validate,
  employeeController.updateEmployee
);
router.delete('/:id', authorize('manage_employees'), employeeController.deleteEmployee);
router.post(
  '/:id/avatar',
  authorize('manage_employees', 'manage_own_profile'),
  profileUpload.single('profilePicture'),
  employeeController.uploadAvatar
);

module.exports = router;
