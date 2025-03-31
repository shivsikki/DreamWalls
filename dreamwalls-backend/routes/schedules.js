const express = require('express');
const router = express.Router();
const { createSchedule, getSchedulesByProperty } = require('../controllers/scheduleController');
const Schedule = require('../models/Schedule');

router.post('/', async (req, res) => {
    try {
        // Check for existing schedule
        const existingSchedule = await Schedule.findOne({
            property_id: req.body.property_id,
            visit_date: req.body.visit_date,
            visit_time: req.body.visit_time
        });

        if (existingSchedule) {
            return res.status(400).json({ 
                message: "This time slot is already booked" 
            });
        }

        // Validate date is not in the past
        const selectedDate = new Date(req.body.visit_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            return res.status(400).json({ 
                message: "Cannot schedule for a past date" 
            });
        }

        const schedule = new Schedule(req.body);
        const savedSchedule = await schedule.save();
        res.status(201).json(savedSchedule);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/property/:id', getSchedulesByProperty);

// Add this route to get schedules for a specific property
router.get('/property/:propertyId', async (req, res) => {
    try {
        const schedules = await Schedule.find({ 
            property_id: req.params.propertyId 
        });
        res.json(schedules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 