const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register user
exports.register = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    try {
        // Validate input
        if (!name || !email || !phoneNumber || !password) {
            return res.status(400).json({ success: false, error: 'Please provide all required fields' });
        }

        // Create user
        const user = await User.create({ name, email, phoneNumber, password });
        sendTokenResponse(user, 201, res);
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        });
    }
};

exports.getMe = async (req, res) => {
    const user = await User.findById(req.userId);
    res.status(200).json({ success: true, data: user });
};

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ success: true, token });
}; 