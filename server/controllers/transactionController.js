const Transaction = require('../models/Transaction');

const getTransactions = async (req, res) => {
  try {
    console.log(`getting transactions -- request body: ${JSON.stringify(req.body)}, request query: ${JSON.stringify(req.query)}`)
    const { startDate, endDate } = req.query;
    const transactions = await Transaction.find({
      date: { $gte: new Date(startDate).getTime(), $lte: new Date(endDate).getTime() },
      status: { $in: ['COMPLETED', 'IN PROGRESS', 'REJECTED'] }
    }).sort({ date: 1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loadTransactions = async (req, res) => {
  try {
    console.log(`getting transactions -- request body: ${JSON.stringify(req.body)}, request query: ${JSON.stringify(req.query)}`)
    const transactions = req.body;
    await Transaction.insertMany(transactions);
    res.status(200).json({ message: 'Transactions loaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getTransactions, loadTransactions };