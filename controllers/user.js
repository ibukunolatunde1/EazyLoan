const User = require('../models/user');

const bcrypt = require('bcryptjs');

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