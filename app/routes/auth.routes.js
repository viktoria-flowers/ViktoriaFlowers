const { Router } = require('express');
const passport = require('passport');

const attach = (app) => {
    const router = new Router();

    router.post('/login',
       passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            // failureFlash: true,
        })
    );

    app.use('/', router);
};

module.exports = attach;
