const Property = require('../models/Property');
const Counter = require('../models/Counter');

const verifyAndRepairCounter = async () => {
    try {
        // Find the highest existing ID
        const highestProperty = await Property.findOne({}, { id: 1 }).sort({ id: -1 });
        const highestId = highestProperty ? highestProperty.id : 0;

        // Update the counter to match the highest ID
        await Counter.findOneAndUpdate(
            { _id: 'propertyId' },
            { $max: { seq: highestId } },
            { upsert: true }
        );

        console.log(`Counter synchronized with highest property ID: ${highestId}`);
    } catch (error) {
        console.error('Error verifying counter:', error);
    }
};

module.exports = { verifyAndRepairCounter }; 