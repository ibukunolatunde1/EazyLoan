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
        .then(loans => {
            if(!loans){
                res.status(404).json({ message: 'No loans found'});
            }
            res.status(200).json({
                message: 'Found these loans',
                data: loans
            })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

exports.getLoan = (req, res, next) => {
    const loanId = req.params.loanId;
    Loan.findOne({ loanid: loanId })
        .then(loan => {
            if(!loan){
                res.status(404).json({ message: 'No loans found'});
            }
            res.status(200).json({
                message: 'Found these loans',
                data: loan
            })
        })
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

    //Verify that the customer has put in the correct values
    if(loanAmount < MIN_AMOUNT || loanAmount > MAX_AMOUNT)
        res.status(400).json({ message: `Only loans between ${MIN_AMOUNT} and ${MAX_AMOUNT} can be requested.`});
    else if(loanTenure < MIN_TENURE || loanTenure > MAX_TENURE)
        res.status(400).json({ message: `Please select between ${MIN_TENURE} and ${MAX_TENURE} months.`});
    else {
        //Check that the customer has all details filled up before continuing
        User.findOne({ customerid: customerId })
            .then(result => {
                const { title, firstname, middlename, lastname, gender, maritalstatus, officialemail, employername, homeaddress, stateofresidence } = result;
                if(title && firstname && middlename && lastname && gender && maritalstatus && officialemail && employername && homeaddress && stateofresidence == 'pending') {
                    res.status(422).json({
                        message: 'Please fill up the required Personal and Employment details to continue with loan application'
                    })  
                } else return Loan.findOne({ customerid: customerId})
            })
            .then(result => {
                if(!result) {
                    const loan = new Loan({
                        customerid: customerId,
                        loanamount: loanAmount,
                        loantenure: loanTenure,
                        loanrequestdate: Date.now(),
                        isActive: false,
                        isApproved: 'pending',
                        isAcceptedOffer: 'pending'
                    });
                    return loan.save();
                } else res.status(400).json({ message: 'You have a loan already' });
            })
            .then(result => {
                res.status(200).json({
                    message: 'Your request has been added, we will get in touch shortly',
                    result
                })
            })
            .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                // return next(error);
            })
    }
        
}

exports.postSetApproval = (req, res, next) => {
    //This is an admin route - need to validate an admin only to use the route
    //Retrieve the loan
    const loan = req.params.loanid;
    let approved;
    Loan.findOne({ _id: loan})
        .then(result => {
            //run some salary check and credit score on the CX
            approved = true;
            const interestRate = 0.075;
            //if passed - inform the customer that we want to give him a loan
            if(approved) {
                result.isApproved = 'approved';
                result.interestpermonth = parseFloat(result.loanamount) * interestRate * (parseInt(result.loantenure) / 12.00 );
                result.repaymentamount = parseFloat(result.loanamount) + parseFloat(result.interestpermonth);
                result.totalrepaymentamount = parseFloat(result.repaymentamount) * parseFloat(result.loantenure);
                return result.save();
            } else {
                //if failed, also inform the customer accordingly
                result.isApproved = 'declined';
                return result.save();
            }
            
        })
        .then(result => {
            approved ? res.status(200).json({ message: 'Your loan has been approved', result}) : res.status(200).json({ message: 'Your loan cannot be approved at this time', result }) 
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
        })
}