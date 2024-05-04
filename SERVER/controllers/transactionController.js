const axios = require('axios');
const Address = require('../models/Transaction');
require('dotenv').config();

const fetchTransactions = async (address) => {
  try {
    const apiKey = process.env.ETHERSCAN_API_KEY;
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`;
    
    const response = await axios.get(url);
    const { status, message, result: transactions } = response.data;

    if (status !== '1' || message !== 'OK' || !Array.isArray(transactions)) {
      throw new Error('Invalid response from Etherscan API');
    }

    await saveTransactionsForAddress(address, transactions);

    return transactions;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to fetch transactions');
  }
};

const saveTransactionsForAddress = async (address, transactions) => {
  try {
    let addressDoc = await Address.findOne({ address });
    if (!addressDoc) {
      addressDoc = new Address({ address });
    }
    const uniqueTransactions = transactions.filter(transaction => {
      return !addressDoc.transactions.some(existingTransaction => existingTransaction.hash === transaction.hash);
    });
    addressDoc.transactions.push(...uniqueTransactions);

    await addressDoc.save();
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to save transactions for address');
  }
};


module.exports = {
  fetchTransactions,
};

