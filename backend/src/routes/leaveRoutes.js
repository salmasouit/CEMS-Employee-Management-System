const express = require('express');
const leaveController = require('../controllers/leaveController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { leaveValidation } = require('../utils/validators');
const { leaveUpload } = require('../config/multer');

const router = express.Router();

router.use(authenticate);

router.get('/', leaveController.getLeaveRequests);
router.get('/:id', leaveController.getLeaveRequest);
router.post(
  '/',
  authorize('submit_leave'),
  leaveUpload.single('attachment'),
  leaveValidation,
  validate,
  leaveController.createLeaveRequest
);
router.patch('/:id/approve', authorize('approve_leave'), leaveController.approveLeave);
router.patch('/:id/reject', authorize('reject_leave'), leaveController.rejectLeave);
router.patch('/:id/cancel', authorize('submit_leave'), leaveController.cancelLeave);

module.exports = router;
