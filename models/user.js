const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    title: {
        type: String
    },
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
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
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    maritalstatus: {
        type: String,
        required: true
    },
    officialemail: {
        type: String,
        required: true
    },
    employername: {
        type: String,
        required: true
    },
    employername: {
        type: String,
        required: true
    },
    employername: {
        type: String,
        required: true
    },
    salary: Number,
    salaryPaymentDate: String,
    homeaddress: {
        type: String,
        required: true
    },
    LGA: String,
    stateofresidence: {
        type: String,
        required: true
    },
    bankcode: {
        type: Number,
        required: true
    },
    accountnumber: {
        type: Number,
        required: true
    },
    bvn: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);