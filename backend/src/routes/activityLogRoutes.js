const express = require('express');
const activityLogController = require('../controllers/activityLogController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.use(authenticate);
router.get('/', authorize('view_logs'), activityLogController.getActivityLogs);

module.exports = router;
