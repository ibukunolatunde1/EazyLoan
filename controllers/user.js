const User = require('../models/user');

const bcrypt = require('bcryptjs');

exports.postSignUp = (req, res, next) => {
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const bvn = req.body.bvn;
    const dob = req.body.dob;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
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
                        dob: dob,
                        bvn: bvn
                    });
                    return user.save();
                })
                .then(result => console.log(result));
        })
        .catch(err => console.log(err));
}

exports.postSignIn = (req, res, next) => {
    const phonenumber = req.body.phoneNumber;
    const password = req.body.password;
    User.findOne({ phonenumber: phonenumber})
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