const express = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  loginValidation,
  forgotPasswordValidation,
  resetPasswordValidation,
  changePasswordValidation,
} = require('../utils/validators');

const router = express.Router();

router.post('/login', loginValidation, validate, authController.login);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', forgotPasswordValidation, validate, authController.forgotPassword);
router.post('/reset-password', resetPasswordValidation, validate, authController.resetPassword);

router.use(authenticate);
router.get('/me', authController.getMe);
router.post('/logout', authController.logout);
router.put('/change-password', changePasswordValidation, validate, authController.changePassword);

module.exports = router;
