require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const fileUpload = require('express-fileupload');
const propertyRoutes = require('./routes/properties');
const propertyDetailsRoutes = require('./routes/propertyDetails');
const userDetailsRoutes = require('./routes/userDetails');
const mongoose = require('mongoose');
const Counter = require('./models/Counter');
const { verifyAndRepairCounter } = require('./utils/counterUtils');
const scheduleRoutes = require('./routes/schedules');
const userRoutes = require('./routes/userRoutes');
const savedPropertyRoutes = require('./routes/savedPropertyRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors());

// File upload
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const properties = require('./routes/properties');
const propertyDetails = require('./routes/propertyDetails');

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/properties', properties);
app.use('/api/v1/property-details', propertyDetails);
app.use('/api/v1/user-details', userDetailsRoutes);
app.use('/api/v1/schedules', scheduleRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/users', savedPropertyRoutes);
app.use('/api/v1/contact', contactRoutes);

// Test route
app.get('/test', (req, res) => {
    res.json({ message: 'Server is running' });
});

// Error handler
app.use(errorHandler);

// Add error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => 
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});

const initializeCounter = async () => {
    try {
        const counter = await Counter.findById('propertyId');
        if (!counter) {
            await Counter.create({
                _id: 'propertyId',
                seq: 0
            });
            console.log('Property counter initialized');
        }
    } catch (error) {
        console.error('Error initializing counter:', error);
    }
};

mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('MongoDB Connected...');
        await verifyAndRepairCounter();
    })
    .catch(err => console.error('MongoDB connection error:', err));
