const express = require('express');
const loansController = require('../controllers/loans');

const router = express.Router();

router.get('/', loansController.getHomepage);
router.get('/loans', loansController.getLoans);
router.get('/loans/:id', loansController.getLoan);
router.post('/loan', loansController.postCreateLoanApplication);

module.exports = router;