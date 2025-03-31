const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
    property_id: {
        type: Number,
        required: true,
        ref: 'Property'
    },
    visitor_name: {
        type: String,
        required: true
    },
    visitor_email: {
        type: String,
        required: true
    },
    visitor_phone: {
        type: String,
        required: true
    },
    visit_date: {
        type: Date,
        required: true
    },
    visit_time: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Schedule', ScheduleSchema); 