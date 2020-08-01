require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const loanRoute = require('./routes/loans');
const adminRoute = require('./routes/admin');
const errorController = require('./controllers/error');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', loanRoute);
app.use('/admin', adminRoute);

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