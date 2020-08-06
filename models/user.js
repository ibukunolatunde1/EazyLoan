require('dotenv').config();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;
const connection = mongoose.createConnection(process.env.DB_URL);
autoIncrement.initialize(connection);

const userSchema = new Schema({
    seqid: {
        type: Number,
        default: 0
    },
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

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'seqid',
    startAt: 1,
    incrementBy: 1
});
module.exports = mongoose.model('User', userSchema);