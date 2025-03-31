const cloudinary = require('../config/cloudinary');
const express = require('express');
const router = express.Router();
const PropertyDetails = require('../models/PropertyDetails');
const { upload } = require('../middleware/upload');

// @desc    Get property details by property ID
// @route   GET /api/v1/property-details/:propertyId
// @access  Public
router.get('/:propertyId', async (req, res) => {
    try {
        const propertyDetails = await PropertyDetails.findOne({ property_id: req.params.propertyId });
        
        if (!propertyDetails) {
            return res.status(404).json({
                success: false,
                error: 'Property details not found'
            });
        }

        res.status(200).json({
            success: true,
            data: propertyDetails
        });
    } catch (error) {
        console.error('Error fetching property details:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

// @desc    Create property details
// @route   POST /api/v1/property-details
// @access  Public
router.post('/', upload.array('sideImages', 3), async (req, res) => {
    try {
        const { property_id, buy_price, rent_price } = req.body;

        // Validate that property_id, buy_price, and rent_price are provided
        if (!property_id || !buy_price || !rent_price) {
            return res.status(400).json({
                success: false,
                error: 'Property ID, buy price, and rent price are required'
            });
        }

        // Upload main image
        if (!req.files || !req.files[0]) {
            return res.status(400).json({
                success: false,
                error: 'Main image is required'
            });
        }

        const mainImageResult = await cloudinary.uploader.upload(req.files[0].path);
        const mainImage = {
            url: mainImageResult.secure_url,
            public_id: mainImageResult.public_id
        };

        // Upload side images
        const sideImages = [];
        for (let i = 1; i < req.files.length; i++) {
            const result = await cloudinary.uploader.upload(req.files[i].path);
            sideImages.push({
                url: result.secure_url,
                public_id: result.public_id
            });
        }

        // Create property details in the database
        const propertyDetails = await PropertyDetails.create({
            property_id,
            mainImage,
            sideImages,
            buy_price,
            rent_price,
            last_updated: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        res.status(201).json({
            success: true,
            data: propertyDetails
        });
    } catch (error) {
        console.error('Error creating property details:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// @desc    Update property details
// @route   PUT /api/v1/property-details/:propertyId
// @access  Public
router.put('/:propertyId', async (req, res) => {
    try {
        const propertyDetails = await PropertyDetails.findOne({ property_id: req.params.propertyId });
        
        if (!propertyDetails) {
            return res.status(404).json({
                success: false,
                error: 'Property details not found'
            });
        }

        // Delete old images from cloudinary if new ones are uploaded
        if (req.files) {
            for (const image of propertyDetails.images) {
                await cloudinary.uploader.destroy(image.public_id);
            }
        }

        // Upload new images if provided
        let newImages = propertyDetails.images; // Keep old images by default
        if (req.files) {
            newImages = [];
            
            // Upload new main image
            if (req.files.mainImage) {
                const result = await cloudinary.uploader.upload(req.files.mainImage.tempFilePath);
                newImages.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }

            // Upload new extra images
            if (req.files.extraImages) {
                const extraImagesArray = Array.isArray(req.files.extraImages) 
                    ? req.files.extraImages 
                    : [req.files.extraImages];

                for (const image of extraImagesArray) {
                    const result = await cloudinary.uploader.upload(image.tempFilePath);
                    newImages.push({
                        url: result.secure_url,
                        public_id: result.public_id
                    });
                }
            }
        }

        const updatedPropertyDetails = await PropertyDetails.findOneAndUpdate(
            { property_id: req.params.propertyId },
            {
                ...req.body,
                images: newImages
            },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            data: updatedPropertyDetails
        });
    } catch (error) {
        console.error('Error updating property details:', error);
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// Add this route to get all property details
router.get('/', async (req, res) => {
    try {
        const propertyDetails = await PropertyDetails.find({});
        res.status(200).json({
            success: true,
            data: propertyDetails
        });
    } catch (error) {
        console.error('Error fetching property details:', error);
        res.status(500).json({
            success: false,
            error: 'Server Error'
        });
    }
});

module.exports = router; 