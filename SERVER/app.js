const express = require('express');
const transactionRoutes = require('./routes/transactionRoutes');
require('./db'); // Connect to MongoDB
require('./schedule'); // Start the scheduler
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
console.log(process.env.PORT,"log port")
app.use('/api/transactions', transactionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
