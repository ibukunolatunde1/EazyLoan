require('dotenv').config();
const User = require('../models/user');
const bankCode = require('../utils/bankcodes');

const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bankcodes = require('../utils/bankcodes');

exports.postSignUp = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const { email, phoneNumber, bvn, dob, password } = req.body;
    bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                email: email,
                password: hashedPassword,
                phonenumber: phoneNumber,
                dob: new Date(dob),
                bvn: bvn,
            });
            return user.save();
            //After Saving - and I have a seq ID, I want to update my DB to have my CustomerID as EZL2020(seqID);
        })
        .then(result => {
            result.customerid = `EZL${new Date().getFullYear()}${result.seqid}`
            return result.save();  
        })
        .then(result => {
            res.status(200).json({
                message: 'Successful',
                data: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.postSignIn = (req, res, next) => {
    const { phoneNumber, password } = req.body;
    let currentUser;
    User.findOne({ phonenumber: phoneNumber})
        .then(user => {
            if(!user) {
                const error = new Error('A user with this phone number could not be found');
                error.statusCode = 401;
                throw error;
            }
            currentUser = user;
            return bcrypt.compare(password, user.password);
        })
        .then(matches => {
            if(!matches){
                const error = new Error('Wrong Password');
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({ email: currentUser.email, customerId: currentUser.customerid }, process.env.SECRET, { expiresIn: '1h' });
            res.status(200).json({
                token,
                customerId: currentUser.customerid
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.getUser = (req, res, next) => {
    const customerId = req.params.customerId;
    User.findOne({customerid: customerId})
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.updateUser = (req, res, next) => {
    const customerId = req.customerId;
    const { title, firstname, middlename, lastname, gender, maritalstatus, officialemail, employername, homeaddress, stateofresidence } = req.body;
    const { bankcode, accountnumber } = req.body;
    User.findOne({ customerid: customerId})
        .then(result => {
            if(!result){
                const error = new Error('Could not find user');
                error.statusCode = 404;
                throw error;
            }
            result.title = title;
            result.firstname = firstname;
            result.middlename = middlename;
            result.lastname = lastname;
            result.gender = gender;
            result.maritalstatus = maritalstatus;
            result.officialemail = officialemail;
            result.employername = employername;
            result.homeaddress = homeaddress;
            result.stateofresidence = stateofresidence;

            //have to validate the bank account before saving it - but will save it for now
            result.accountnumber = accountnumber;
            result.bankcode = bankCode[bankcode].code;

            return result.save();
        })
        .then(result => {
            res.status(200).json({ message: 'User updated!', result });
        })
        .catch(err => {
            console.log(err);
            if(!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
}