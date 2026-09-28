const express = require('express');
const reportController = require('../controllers/reportController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');

const router = express.Router();

router.use(authenticate);
router.get('/:type', authorize('export_reports'), reportController.exportReport);

module.exports = router;
