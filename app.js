require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const csrf = require('csurf');

const loanRoute = require('./routes/loans');
const adminRoute = require('./routes/admin');
const userRoute = require('./routes/user');
const errorController = require('./controllers/error');

const app = express();
const csrfProtecion =  csrf();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api', loanRoute);
app.use('/admin', adminRoute);
app.use('/user', userRoute);

app.use(errorController.get404);

mongoose
    .connect(process.env.DB_URL)
    .then(result => {
        const port = process.env.PORT || 3000;
        app.listen(port, () => console.log(`Listening on port ${port}`));
    })
    .catch(err => {
        console.log(err);
    });

module.exports = app;