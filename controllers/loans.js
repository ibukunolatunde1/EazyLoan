const Loan = require('../models/loan');

exports.getHomepage = (req, res, next) => {
    res.status(200).json({
        status: 'succeded',
        message: 'Welcome to Homepage'
    });
}

exports.getLoans = (req, res, next) => {
    Loan.find()
        .then(loans => console.log(loans))
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

exports.getLoan = (req, res, next) => {
    const loanId = req.params.loanId;
    Loan.findById(loanId)
        .then(loan => console.log(loan))
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}