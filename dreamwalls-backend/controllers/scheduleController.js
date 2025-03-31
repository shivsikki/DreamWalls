const Schedule = require('../models/Schedule');

exports.createSchedule = async (req, res) => {
    try {
        const {
            property_id,
            visitor_name,
            visitor_email,
            visitor_phone,
            visit_date,
            visit_time,
            notes
        } = req.body;

        const schedule = await Schedule.create({
            property_id,
            visitor_name,
            visitor_email,
            visitor_phone,
            visit_date,
            visit_time,
            notes
        });

        res.status(201).json({
            success: true,
            data: schedule
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

exports.getSchedulesByProperty = async (req, res) => {
    try {
        const schedules = await Schedule.find({ property_id: req.params.id });
        res.status(200).json({
            success: true,
            data: schedules
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}; 