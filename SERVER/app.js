const express = require('express');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const { jsonParser } = require('./middleware');
require('./db');
require('./schedule');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

// Routes
app.use('/api/transactions', transactionRoutes);
app.use('/api/user', jsonParser, userRoutes); 

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
