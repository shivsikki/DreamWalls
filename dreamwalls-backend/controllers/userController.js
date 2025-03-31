const User = require('../models/User');
const Property = require('../models/Property');

// @desc    Get current logged in user
// @route   GET /api/v1/users/me
// @access  Private
exports.getMe = async (req, res, next) => {
    try {
        // Fetch the user by ID from the request
        const user = await User.findById(req.userId).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        return res.status(200).json({
            success: true,
            data: user // Ensure user data is included here
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

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
            user.savedProperties.push(propertyId);
        } else {
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