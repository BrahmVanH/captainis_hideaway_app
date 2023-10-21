const mongoose = require('mongoose');


mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/captainsRentals'
);

const db = mongoose.connection;

// Error handling for the database connection
db.on('error', (error) => {
	console.error('MongoDB connection error:', error);
});

db.once('open', () => {
	console.log('Connected to MongoDB database');
});

module.exports = mongoose.connection;
