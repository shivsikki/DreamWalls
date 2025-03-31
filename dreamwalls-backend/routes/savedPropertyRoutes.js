const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
    getSavedProperties,
    toggleSaveProperty
} = require('../controllers/savedPropertyController');

router.get('/saved-properties', protect, getSavedProperties);
router.post('/save-property', protect, toggleSaveProperty);

module.exports = router; 