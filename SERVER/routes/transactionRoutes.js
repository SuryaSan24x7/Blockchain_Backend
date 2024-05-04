const express = require('express');
const router = express.Router();
const { fetchTransactions } = require('../controllers/transactionController');

router.get('/:address', async (req, res) => {
  try {
    const address = req.params.address;
    // const address = '0xce94e5621a5f7068253c42558c147480f38b5e0d';
    const transactions = await fetchTransactions(address);
    res.json(transactions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
