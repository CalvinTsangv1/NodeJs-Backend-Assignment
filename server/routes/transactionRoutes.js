const express = require('express');
const { getTransactions, loadTransactions, getTransactionById, updateTransaction } = require('../controllers/transactionController');


const router = express.Router();
router.get('/', getTransactions);
router.post('/load', loadTransactions);
router.get('/:id', getTransactionById);
router.patch('/:id', updateTransaction);

module.exports = router;