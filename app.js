const express = require('express');
const bodyParser = require('body-parser');

const loanRoute = require('./routes/loans');
const adminRoute = require('./routes/admin');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/api', loanRoute);
app.use('/admin', adminRoute);

app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: "Page not found"
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;