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

exports.postCreateLoanApplication = (req, res, next) => {
    const {loanAmount, loanTenure} = req.body;
    const customerId = req.params.customerId;
    // If none of them exist, then its not a valid loan application
    const MIN_AMOUNT = 50000;
    const MAX_AMOUNT = 2000000;
    const MIN_TENOR = 1;
    const MAX_TENOR = 18;
    
    //TODO: Authorize this page for a specific customer

    //TODO: Confirm that the customer has the exact parameters
    if(loanAmount < MIN_AMOUNT || loanAmount > MAX_AMOUNT)
        return res.status(400).json({ message: `Only loans between ${MIN_AMOUNT} and ${MAX_AMOUNT} can be requested.`});
    if(loanTenure < MIN_TENOR || loanTenure > MAX_TENOR)
        return res.status(400).json({ message: `Please select between ${MIN_FREQUENCY} and ${MAX_FREQUENCY} months.`});
    
    //TODO: Confirm that the customer has all his personal details set up

    //TODO: Save loan to DB - if earlier operation succeeds

    //TODO: Inform the customer that you are processing his request and will get back in an hour
}