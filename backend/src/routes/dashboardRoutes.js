const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.use(authenticate);
router.get('/stats', authorize('view_dashboard'), dashboardController.getDashboardStats);
router.get('/charts', authorize('view_dashboard'), dashboardController.getDashboardCharts);

module.exports = router;
