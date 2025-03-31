const express = require('express');
const router = express.Router();
const UserDetails = require('../models/UserDetails');
const auth = require('../middleware/auth');

// Get user details
router.get('/:userId', auth, async (req, res) => {
  try {
    const userDetails = await UserDetails.findOne({ userId: req.params.userId });
    if (!userDetails) {
      return res.status(404).json({ message: 'User details not found' });
    }
    res.json(userDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update user details
router.post('/', auth, async (req, res) => {
  try {
    let userDetails = await UserDetails.findOne({ userId: req.body.userId });

    if (userDetails) {
      // Update existing details
      userDetails = await UserDetails.findOneAndUpdate(
        { userId: req.body.userId },
        req.body,
        { new: true, runValidators: true }
      );
    } else {
      // Create new details
      userDetails = new UserDetails(req.body);
      await userDetails.save();
    }

    res.json(userDetails);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 