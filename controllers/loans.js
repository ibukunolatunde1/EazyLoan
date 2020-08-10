const Loan = require('../models/loan');
const User = require('../models/user');

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
    const customerId = req.customerId;
    const MIN_AMOUNT = 50000;
    const MAX_AMOUNT = 2000000;
    const MIN_TENURE = 1;
    const MAX_TENURE = 18;

    //TODO: Confirm that the customer has all his personal details set up
    User.findOne({ customerid: customerId})
        .then(result => {
            if(!result) {
                const error = new Error('Cannot find user');
                error.httpStatusCode = 404;
                throw error;
            }
            const { title, firstname, middlename, lastname, gender, maritalstatus, officialemail, employername, homeaddress, stateofresidence } = result;
            if(title || firstname || middlename || lastname || gender || maritalstatus || officialemail || employername || homeaddress || stateofresidence == 'pending') {
                res.status(401).json({
                    message: 'Please fill up the required Personal and Employment details to continue with loan application'
                })
            }
            //TODO: Confirm that the customer has the exact parameters
            if(loanAmount < MIN_AMOUNT || loanAmount > MAX_AMOUNT)
                return res.status(400).json({ message: `Only loans between ${MIN_AMOUNT} and ${MAX_AMOUNT} can be requested.`});
            if(loanTenure < MIN_TENURE || loanTenure > MAX_TENURE)
                return res.status(400).json({ message: `Please select between ${MIN_TENURE} and ${MAX_TENURE} months.`});
            
            //TODO: Check if there are existing loans
            return Loan.findOne({customerid: customerId})              
        })
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
    
    
    
 
    

    //TODO: Save loan to DB - if earlier operation succeeds

    //TODO: Inform the customer that you are processing his request and will get back in an hour
}