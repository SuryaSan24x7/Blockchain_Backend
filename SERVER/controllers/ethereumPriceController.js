const axios = require('axios');
const EthereumPrice = require('../models/EthereumPrice');

const fetchAndStoreEthereumPrice = async () => {
    try {
      const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr';
      const response = await axios.get(url);
      const newPrice = response.data.ethereum.inr;
  
      // Find the latest Ethereum price document
      let ethereumPrice = await EthereumPrice.findOne().sort({ timestamp: -1 });
  
      // If no existing document found, create a new one
      if (!ethereumPrice) {
        ethereumPrice = new EthereumPrice({ price: newPrice });
      } else {
        // Update the existing document with the new price and add a new timestamp
        ethereumPrice.price = newPrice;
        ethereumPrice.timestamp = new Date();
      }
  
      // Save the updated document
      await ethereumPrice.save();
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch and store Ethereum price');
    }
  };
  
  module.exports = {
    fetchAndStoreEthereumPrice,
  };
  