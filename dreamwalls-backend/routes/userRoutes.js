const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// Use the controller functions directly
router.get('/saved-properties', protect, userController.getSavedProperties);
router.post('/save-property', protect, userController.toggleSaveProperty);

module.exports = router; 