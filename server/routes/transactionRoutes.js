const express = require('express');
const { getTransactions, loadTransactions } = require('../controllers/transactionController');


const router = express.Router();
router.get('/', getTransactions);
router.post('/load', loadTransactions);

module.exports = router;