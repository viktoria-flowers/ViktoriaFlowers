// https://scotch.io/tutorials/easy-node-authentication-setup-and-local#toc-routes-approutesjs
// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }

    // if they aren't redirect them to the login page
    res.status(401);
    return res.redirect('/login');
};

module.exports = isLoggedIn;
