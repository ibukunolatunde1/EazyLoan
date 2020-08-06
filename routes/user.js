const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.post('/signup', userController.postSignUp);
router.post('/login', userController.postSignIn);
router.get('/profile', userController.getUser);

module.exports = router;