const express = require('express');
const { getTransactions, loadTransactions, getTransactionById, updateTransaction } = require('../controllers/transactionController');


const router = express.Router();

//get all transactions
router.get('/', getTransactions);

//get transaction by id
router.get('/:id', getTransactionById);

//load transactions
router.post('/load', loadTransactions);

//update transaction by id
router.patch('/:id', updateTransaction);

module.exports = router;