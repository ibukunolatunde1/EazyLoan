require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const header = req.get('Authorization');
    if(!header) {
        const error = new Error('Authentication Failed');
        error.statusCode = 401;
        throw error;
    }
    const token = header.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if(!decodedToken) {
        const error = new Error('Authentication Failed');
        error.statusCode = 401;
        throw error;
    }
    req.customerId = decodedToken.customerid;
    next();
}