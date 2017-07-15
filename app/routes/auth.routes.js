const { Router } = require('express');
const passport = require('passport');

const attach = (app, usersData) => {
    const router = new Router();

    router.post('/login',
       passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            // failureFlash: true,
        })
    );

    router.post('/register', (req, res) => {
        usersData.create(req.body).then((user) => {
            req.logIn(user, (err) => {
                if (err) {
                    console.log(err);
                    res.redirect('/login');
                }

                res.redirect('/profile');
            });
        })
        .catch((err) => {
            res.redirect('/register');
        });
    });

    app.use('/', router);
};

module.exports = attach;
