const express = require('express');
const { body } = require('express-validator/check');
const loansController = require('../controllers/loans');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/', loansController.getHomepage);
router.get('/loans', loansController.getLoans);
router.get('/loans/:id', loansController.getLoan);

router.post(
    '/loan',
    isAuth,
    [
        body('loanAmount')
            .trim()
            .isNumeric()
            .withMessage('Please enter an amount between 50000 and N5 million'),
        body('loanTenure')
            .trim()
            .isNumeric()
            .withMessage('Please enter between 1 and 18 months')
    ],
    loansController.postCreateLoanApplication
);

module.exports = router;