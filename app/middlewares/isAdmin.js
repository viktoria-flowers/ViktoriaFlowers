// middleware allow only administrators
const authorizeAdmin = (req, res, next) => {
    if (res.locals.isAdmin) {
        return next();
    }

    res.status(403);
    return res.redirect('/login');
};

module.exports = authorizeAdmin;
