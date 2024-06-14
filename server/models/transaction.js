const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  id: {type: String, required: true, unique: true},
  date: { type: Date, required: true },
  sender: {
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    IDNumber: { type: String, required: true }
  },
  recipient: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    accountNumber: { type: String, required: true },
    bank: { type: String, required: true }
  },
  Amount: { type: Number},
  CurrencyCd: { type: String},
  Comments: { type: String },
  status: { type: String, required: true }
});

//make compound index for speed up query
TransactionSchema.index({ date: 1, status: 1 });
TransactionSchema.index({firstName: 1, lastName: 1, dateOfBirth: 1});
TransactionSchema.index({accountNumber: 1, bank: 1});


module.exports = mongoose.model('transaction', TransactionSchema);