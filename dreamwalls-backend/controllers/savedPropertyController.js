const User = require('../models/User');
const Property = require('../models/Property');

// Get saved properties
exports.getSavedProperties = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('savedProperties');
        res.status(200).json({
            success: true,
            savedProperties: user.savedProperties || []
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error fetching saved properties'
        });
    }
};

// Save/unsave property
exports.toggleSaveProperty = async (req, res) => {
    try {
        const { propertyId } = req.body;
        const user = await User.findById(req.user.id);

        const propertyIndex = user.savedProperties.indexOf(propertyId);
        
        if (propertyIndex === -1) {
            // Save property
            user.savedProperties.push(propertyId);
        } else {
            // Unsave property
            user.savedProperties.splice(propertyIndex, 1);
        }

        await user.save();

        res.status(200).json({
            success: true,
            isSaved: propertyIndex === -1,
            savedProperties: user.savedProperties
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Error toggling property save status'
        });
    }
}; 