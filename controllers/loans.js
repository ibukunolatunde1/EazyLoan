exports.getHomepage = (req, res, next) => {
    res.status(200).json({
        status: 'succeded',
        message: 'Welcome to Homepage'
    });
}