const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    title: {
        type: String,
        default: 'pending'
    },
    firstname: {
        type: String,
        required: true,
        default: 'pending'
    },
    middlename: {
        type: String,
        default: 'pending'
    },
    lastname: {
        type: String,
        required: true,
        default: 'pending'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phonenumber: {
        type: String,
        required: true
    },
    customerid: {
        type: String,
        required: true,
        default: 0
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        default: 'pending'
    },
    maritalstatus: {
        type: String,
        required: true,
        default: 'pending'
    },
    officialemail: {
        type: String,
        required: true,
        default: 'pending'
    },
    employername: {
        type: String,
        required: true,
        default: 'pending'
    },
    employername: {
        type: String,
        required: true,
        default: 'pending'
    },
    employername: {
        type: String,
        required: true,
        default: 'pending'
    },
    salary: Number,
    salaryPaymentDate: String,
    homeaddress: {
        type: String,
        required: true,
        default: 'pending'
    },
    LGA: String,
    stateofresidence: {
        type: String,
        required: true,
        default: 'pending'
    },
    bankcode: {
        type: Number,
        required: true,
        default: 0
    },
    accountnumber: {
        type: Number,
        required: true,
        default: 0
    },
    bvn: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);