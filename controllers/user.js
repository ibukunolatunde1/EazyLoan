const User = require('../models/user');

const bcrypt = require('bcryptjs');
// const { update } = require('../models/user');
// const user = require('../models/user');

exports.postSignUp = (req, res, next) => {
    const { email, phoneNumber, bvn, dob, password, confirmPassword } = req.body;
    User.findOne({ email: email })
        .then(userDoc => {
            if(userDoc){
                return res.status(200).json({message: 'User already exists'})
            }
            return bcrypt
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
                });
        })
        .catch(err => console.log(err));
}

exports.postSignIn = (req, res, next) => {
    const { phoneNumber, password } = req.body;
    User.findOne({ phonenumber: phoneNumber})
        .then(user => {
            if(!user) {
                return res.status(400).json({message: 'Invalid Phone or password'})
            }
            bcrypt.compare(password, user.password)
                .then(matches => {
                    if(matches){
                        return res.status(200).json({message: 'Welcome Friend'})
                    }
                    return res.status(400).json({message: 'Invalid Phone or password'})
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
}

exports.getUser = (req, res, next) => {
    const customerId = req.params.customerId;
    User.findOne({customerId: customerId})
        .then(result => {
            console.log(result);
            res.status(200).json({result: result})
        })
        .catch(err => console.log(err));
}