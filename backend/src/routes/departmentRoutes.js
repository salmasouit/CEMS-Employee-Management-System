const express = require('express');
const departmentController = require('../controllers/departmentController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { departmentValidation } = require('../utils/validators');

const router = express.Router();

router.use(authenticate);

router.get('/all', departmentController.getAllDepartments);
router.get('/', authorize('manage_departments', 'view_departments'), departmentController.getDepartments);
router.get('/:id', authorize('manage_departments', 'view_departments'), departmentController.getDepartment);
router.post('/', authorize('manage_departments'), departmentValidation, validate, departmentController.createDepartment);
router.put('/:id', authorize('manage_departments'), departmentValidation, validate, departmentController.updateDepartment);
router.delete('/:id', authorize('manage_departments'), departmentController.deleteDepartment);

module.exports = router;
