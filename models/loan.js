const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loanSchema = new Schema({

});

module.exports = mongoose.model('Loan', loanSchema);