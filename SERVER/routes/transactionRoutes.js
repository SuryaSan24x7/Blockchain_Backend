const express = require('express');
const router = express.Router();
const { fetchTransactions } = require('../controllers/transactionController');

router.get('/', async (req, res) => {
  try {
    const address = req.query.address.toLowerCase();
    if (!address) {
      return res.status(400).json({ error: 'Address parameter is required' });
    }
    const transactions = await fetchTransactions(address);
    res.json(transactions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
