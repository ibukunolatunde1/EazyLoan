require('dotenv').config();
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const loanSchema = new Schema(
    {
        customerid: {
            type: String,
            ref: 'User',
            required: true
        },
        loanamount: {
            type: String,
            required: true
        },
        interestpermonth: {
            type: String
        },
        loantenure: {
            type: String
        },
        lastrepaymentamount: {
            type: String
        },
        repaymentamount: {
            type: String
        },
        totalrepaymentamount: {
            type: String
        },
        outstandingamount: {
            type: String
        },
        collectionstartdate: {
            type: Date
        },
        loanrequestdate: {
            type: Date,
            required: true
        },
        lastrepaymentdate: {
            type: Date
        },
        loanstopdate: {
            type: Date
        },
        lastrepaymentstatus: {
            type: String
        },
        isActive: {
            type: Boolean,
            required: true
        },
        isApproved: {
            type: String,
            required: true
        },
        isAcceptedOffer: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Loan', loanSchema);