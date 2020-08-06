const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loanSchema = new Schema({
    customerid: {
        type: String,
        ref: 'User',
        required: true
    },
    loanamount: {
        type: Number,
        required: true
    },
    loantenure: {
        type: Number,
        required: true
    },
    lastrepaymentamount: {
        type: String,
        required: true
    },
    repaymentamount: {
        type: Number,
        required: true
    },
    totalrepaymentamount: {
        type: Number,
        required: true
    },
    outstandingamount: {
        type: Number,
        required: true
    },
    collectionstartdate: {
        type: Date,
        required: true
    },
    loanrequestdate: {
        type: Date,
        required: true
    },
    lastrepaymentdate: {
        type: Date,
        required: true
    },
    loanstopdate: {
        type: Date,
        required: true
    },
    lastrepaymentstatus: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Loan', loanSchema);