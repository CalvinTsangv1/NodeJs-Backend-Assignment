require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const transactionRoutes = require('./routes/TransactionRoutes');


console.log(process.env.MONGODB_CONNECTION_STRING)
mongoose.connect(process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/transactions', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/transactions',  transactionRoutes);

const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});