const Transaction = require('../models/Transaction');
const {isAlphabetic, isNumber} = require("../util");

const getTransactions = async (req, res) => {
  try {
    console.log(`getting transactions -- request body: ${JSON.stringify(req.body)}, request query: ${JSON.stringify(req.query)}`)
    const { startDate, endDate } = req.query;
    const query = {status: { $in: ['COMPLETED', 'IN PROGRESS', 'REJECTED'] }}
    if(startDate && endDate) {
      query['date'] = {$gte: startDate, $lte: endDate}
    }
    console.log(`query: ${JSON.stringify(query)}`)
    const transactions = await Transaction.find(query).sort({ date: 1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loadTransactions = async (req, res) => {
  try {
    const transactions = req.body;
    if(!transactions || transactions.length == 0) {
      return res.status(400).json({ error: 'Transactions are required' });
    }

    transactions.forEach(transaction => {
      if(!transaction?.sender?.firstName || !isAlphabetic(transaction?.sender?.firstName)) {
        transaction.firstName = "";
        console.log(`Invalid first name: ${JSON.stringify(transaction?.firstName)}`)
      }

      if(!transaction?.recipient?.firstName || !isAlphabetic(transaction?.recipient?.firstName)) {
        transaction.firstName = "";
        console.log(`Invalid first name: ${JSON.stringify(transaction?.firstName)}`)
      }

      if(!transaction?.sender?.lastName || !isAlphabetic(transaction?.sender?.lastName)) {
        transaction.firstName = "";
        console.log(`Invalid first name: ${JSON.stringify(transaction?.lastName)}`)
      }

      if(!transaction?.recipient?.lastName || !isAlphabetic(transaction?.recipient?.lastName)) {
        transaction.firstName = "";
        console.log(`Invalid first name: ${JSON.stringify(transaction?.lastName)}`)
      }

      transaction.date = new Date(transaction?.date).toUTCString();
    })
    const result = await Transaction.insertMany(transactions);
    console.log(`${JSON.stringify(result)} transactions inserted`);
    res.status(200).json({ message: 'Transactions loaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = { getTransactions, loadTransactions };