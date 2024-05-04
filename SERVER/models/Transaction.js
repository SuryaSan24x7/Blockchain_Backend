const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  blockNumber: String,
  timeStamp: Number,
  hash: String,
  nonce: String,
  blockHash: String,
  transactionIndex: String,
  from: String,
  to: String,
  value: String,
  gas: String,
  gasPrice: String,
  isError: String,
  txreceipt_status: String,
  contractAddress: String,
  cumulativeGasUsed: String,
  gasUsed: String,
  confirmations: String,
  methodId: String,
  functionName: String,
});

const addressSchema = new mongoose.Schema({
  address: {
    type: String,
    unique: true,
    required: true,
  },
  transactions: [transactionSchema], // Embed the transaction schema here
});

const Transaction = mongoose.model('Address', addressSchema);

module.exports = Transaction;
