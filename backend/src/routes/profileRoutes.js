const express = require('express');
const profileController = require('../controllers/profileController');
const authenticate = require('../middleware/auth');
const { profileUpload } = require('../config/multer');

const router = express.Router();

router.use(authenticate);

router.get('/', profileController.getProfile);
router.put('/', profileUpload.single('profilePicture'), profileController.updateProfile);
router.post('/avatar', profileUpload.single('profilePicture'), profileController.uploadProfilePicture);

module.exports = router;
