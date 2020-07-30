const express = require('express');
const loansController = require('../controllers/loans');

const router = express.Router();

router.get('/', loansController.getHomepage);

module.exports = router;