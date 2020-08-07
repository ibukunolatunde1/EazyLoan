const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const userController = require('../controllers/user');

const router = express.Router();

router.post(
    '/signup',
    [
        body('email')
            .trim()
            .isEmail()
            .withMessage('Please enter a valid email. ')
            .custom((value, { req }) => {
                return User.findOne({ email: value}).then(userDoc => {
                    if(userDoc) {
                        return Promise.reject('Email address already exists!');
                    }
                });
            })
            .normalizeEmail(),
        body('password')
            .trim()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),
        body('confirmPassword')
            .custom((value, {req}) => {
                if(value !== req.body.password)
                    throw new Error('Password confirmation is incorrect')
            }),
        body('phoneNumber')
            .trim()
            .isLength({ min: 11, max: 11 })
            .withMessage('Please enter a valid phone number'),
        body('bvn')
            .trim()
            .isNumeric()
            .isLength({ min: 10, max: 10})
            .withMessage('Please enter a valid BVN'),
        body('dob')
            .toDate()

    ],
    userController.postSignUp);
router.post('/login', userController.postSignIn);
router.get('/profile/:id', userController.getUser);

module.exports = router;