const express = require('express');
const router = express.Router();
const EthereumPrice = require('../models/EthereumPrice');
const Address = require('../models/Transaction');
function weiToEth(wei) {
    return wei / 1e18;
  }
// GET API to get user's current balance and current price of Ethereum
router.get('/balance', async (req, res) => {
  try {
    const userAddress = req.query.address.toLowerCase();

    // Retrieve user's transactions from the database
    const userTransactions = await Address.findOne({ address: userAddress });
    if (!userTransactions) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate user's current balance in ether
    let balanceInWei = 0;
    userTransactions.transactions.forEach(transaction => {
        
      if (transaction.from.toLowerCase() === userAddress) {
        balanceInWei -= parseInt(transaction.value);
      }
      if (transaction.to.toLowerCase() === userAddress) {
        balanceInWei += parseInt(transaction.value);
      }
    });
   
    // Fetch the current price of Ethereum
    const ethereumPrice = await EthereumPrice.findOne().sort({ timestamp: -1 });

    if (!ethereumPrice) {
      return res.status(500).json({ message: 'Ethereum price not available' });
    }
    let balanceInEther = weiToEth(balanceInWei);
    // Return user's current balance and current price of Ethereum
    res.json({ balance: balanceInEther, ethereumPrice: ethereumPrice.price });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
