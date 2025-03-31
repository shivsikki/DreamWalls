const express = require('express');
const { getMe } = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// @desc    Get user profile
// @route   GET /api/v1/users/me
// @access  Private
router.get('/me', auth, getMe);

module.exports = router; 