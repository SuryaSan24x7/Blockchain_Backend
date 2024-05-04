const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crypto_transactions', {
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

module.exports = db;
