const express = require('express');
const loansController = require('../controllers/loans');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get('/', loansController.getHomepage);
router.get('/loans', loansController.getLoans);
router.get('/loans/:id', loansController.getLoan);

router.post(
    '/loan',
    isAuth,
    [//validate some things],
    loansController.postCreateLoanApplication
);

module.exports = router;