exports.getAdminPage = (req, res, next) => {
    res.status(200).json({
        status: 'succeded',
        message: 'Welcome to Admin page'
    })
}