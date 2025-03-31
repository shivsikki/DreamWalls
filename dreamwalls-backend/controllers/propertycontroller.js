const Property = require('../models/Property');
const PropertyDetails = require('../models/PropertyDetails');
const Counter = require('../models/Counter');

exports.createProperty = async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { propertyData, propertyDetailsData } = req.body;

        if (!propertyData || !propertyDetailsData) {
            return res.status(400).json({
                success: false,
                error: 'Missing property data or property details data'
            });
        }

        // 1. Get the next available ID
        const nextId = await Counter.getNextSequence('propertyId');
        console.log("Generated next ID:", nextId);

        // 2. Create property with the generated ID
        const propertyWithId = {
            ...propertyData,
            id: nextId
        };
        
        const property = await Property.create(propertyWithId);
        console.log("Property created:", property);

        // 3. Create property details using the same ID
        const propertyDetailsToCreate = {
            property_id: nextId,
            mainImage: propertyDetailsData.mainImage,
            sideImages: propertyDetailsData.sideImages,
            buy_price: Number(propertyDetailsData.buy_price),
            rent_price: Number(propertyDetailsData.rent_price),
            last_updated: new Date()
        };

        console.log("Creating property details with data:", propertyDetailsToCreate);
        const propertyDetails = await PropertyDetails.create(propertyDetailsToCreate);

        res.status(201).json({
            success: true,
            data: {
                property,
                propertyDetails
            }
        });
    } catch (error) {
        console.error('Detailed error:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}; 