const mongoose = require('mongoose');

const propertyDetailsSchema = new mongoose.Schema({
    property_id: {
        type: Number,
        required: true,
        unique: true,
        ref: 'Property'
    },
    mainImage: {
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    },
    sideImages: [{
        url: {
            type: String,
            required: true
        },
        public_id: {
            type: String,
            required: true
        }
    }],
    buy_price: {
        type: Number,
        required: true
    },
    rent_price: {
        type: Number,
        required: true
    },
    last_updated: {
        type: Date,
        default: Date.now
    }
}, {
    collection: 'property_details',
    timestamps: true
});

// Add logging to find operation
propertyDetailsSchema.pre('find', function() {
    console.log('Executing find operation on property_details collection');
});

module.exports = mongoose.model('PropertyDetails', propertyDetailsSchema); 