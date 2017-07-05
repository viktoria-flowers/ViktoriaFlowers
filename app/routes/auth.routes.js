const { Router } = require('express');
const passport = require('passport');

const attach = (app) => {
    require('./config/app.config')(app);
    const router = new Router();
    // app.get('/login', (req, res) => res.render('login'));

    app.post('/login',
        router.authenticate('local', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        })
    ));

    app.use('/login', router);
};

module.exports = attach;
