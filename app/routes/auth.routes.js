const { Router } = require('express');
const passport = require('passport');

const attach = (app) => {
    const router = new Router();
    // app.get('/login', (req, res) => res.render('login'));

    app.post('/login',
        router.authenticate('local', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/views/login',
            failureFlash: true,
        })
    ));

    app.use('/server/views', router);
};

module.exports = attach;
