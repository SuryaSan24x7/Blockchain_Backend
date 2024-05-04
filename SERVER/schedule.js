const cron = require('node-cron');
const { fetchAndStoreEthereumPrice } = require('./controllers/ethereumPriceController');

// Fetch Ethereum price once when the server starts
fetchAndStoreEthereumPrice()
  .then(() => {
    console.log('Ethereum price fetched and stored successfully');
  })
  .catch((error) => {
    console.error('Failed to fetch and store Ethereum price:', error);
  });

// Schedule to fetch Ethereum price every 10 minutes
cron.schedule('*/10 * * * *', async () => {
  await fetchAndStoreEthereumPrice();
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata' // Set your timezone here
});