const mongoose = require('mongoose');
const Counter = require('./Counter');

const PropertySchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Please add a property name']
    },
    location: {
        type: String,
        required: [true, 'Please add a location']
    },
    owner: {
        type: String,
        required: [true, 'Please add an owner name']
    },
    phone_no: {
        type: String,
        required: [true, 'Please add a phone number']
    },
    type: String,
    sale: {
        type: Boolean,
        default: false
    },
    day_of_listing: {
        type: Date,
        default: Date.now
    },
    rooms: {
        type: Number,
        default: 0
    },
    status: String,
    bedrooms: {
        type: Number,
        default: 0
    },
    bathrooms: {
        type: Number,
        default: 0
    },
    kitchen: {
        type: Number,
        default: 0
    },
    total_floors: {
        type: Number,
        default: 0
    },
    furnished: String,
    interior: String,
    quantity: {
        type: Number,
        default: 0
    },
    lifts: Boolean,
    security_guards: Boolean,
    play_ground: Boolean,
    gardens: Boolean,
    water_supply: Boolean,
    power_backup: Boolean,
    parking: Boolean,
    gym: Boolean,
    shopping_mall: Boolean,
    hospitals: Boolean,
    schools: Boolean,
    market_area: Boolean,
    description: String
}, {
    timestamps: true
});

// Add logging to find operation
PropertySchema.pre('find', function() {
    console.log('Executing find operation on properties collection');
});

module.exports = mongoose.model('Property', PropertySchema);
