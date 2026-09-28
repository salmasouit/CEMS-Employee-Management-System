const express = require('express');
const roleController = require('../controllers/roleController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { roleValidation } = require('../utils/validators');

const router = express.Router();

router.use(authenticate);

router.get('/permissions/all', authorize('manage_roles'), roleController.getPermissions);
router.get('/all', roleController.getAllRoles);
router.get('/', authorize('manage_roles', 'view_roles'), roleController.getRoles);
router.get('/:id', authorize('manage_roles', 'view_roles'), roleController.getRole);
router.post('/', authorize('manage_roles'), roleValidation, validate, roleController.createRole);
router.put('/:id', authorize('manage_roles'), roleValidation, validate, roleController.updateRole);
router.delete('/:id', authorize('manage_roles'), roleController.deleteRole);

module.exports = router;
