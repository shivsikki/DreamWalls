const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const { createProperty } = require('../controllers/propertyController');

// @desc    Get all properties
// @route   GET /api/v1/properties
// @access  Public
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all properties');
        const properties = await Property.find();
        console.log('Found properties:', properties);
        res.json(properties);
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get single property
router.get('/:id', async (req, res) => {
    try {
        console.log('Fetching property with ID:', req.params.id);
        const property = await Property.findOne({ id: Number(req.params.id) });
        
        if (!property) {
            console.log('Property not found');
            return res.status(404).json({ message: 'Property not found' });
        }
        
        console.log('Found property:', property);
        res.json(property);
    } catch (error) {
        console.error('Error fetching property:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create property route
router.post('/', createProperty);

module.exports = router; 