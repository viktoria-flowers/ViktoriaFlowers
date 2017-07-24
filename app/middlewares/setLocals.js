// Middleware to set a current user accessible in pug views
const setLocals = (req, res, next) => {
    res.locals.isAuthenticated = !!req.user;
    res.locals.username = !req.user ? '' : req.user.username;

    // set isAdmin
    if (req.user && req.user.roles && req.user.roles.indexOf('admin') !== -1) {
        res.locals.isAdmin = true;
    }

    next();
};

module.exports = setLocals;
