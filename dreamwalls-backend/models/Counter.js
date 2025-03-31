const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

CounterSchema.statics.getNextSequence = async function(name) {
    try {
        // First, find the highest existing ID in the properties collection
        const Property = mongoose.model('Property');
        const highestProperty = await Property.findOne({}, { id: 1 }).sort({ id: -1 });
        const currentHighestId = highestProperty ? highestProperty.id : 0;

        // Find or create counter
        let counter = await this.findById(name);
        
        if (!counter) {
            // If counter doesn't exist, create it with the highest ID
            counter = await this.create({
                _id: name,
                seq: currentHighestId
            });
        } else if (counter.seq < currentHighestId) {
            // If counter exists but is behind, update it
            counter.seq = currentHighestId;
            await counter.save();
        }

        // Increment the sequence
        counter.seq += 1;
        await counter.save();

        return counter.seq;
    } catch (error) {
        console.error('Error in getNextSequence:', error);
        throw error;
    }
};

module.exports = mongoose.model('Counter', CounterSchema); 