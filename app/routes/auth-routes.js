const { Router } = require('express');
const passport = require('passport');

const attach = (app, authController) => {
    const router = new Router();
    router.post('/login', (req, res, next) => {
        return authController.postLogin(req, res, next, passport);
    });

    router.post('/register', (req, res) => {
        return authController.postRegister(req, res);
    });

    router.get('/register', (req, res) => {
        return authController.getRegister(req, res);
    });

    router.get('/login', (req, res) => {
        return authController.getLogin(req, res);
    });

    router.get('/logout', (req, res) => {
        return authController.logOut(req, res);
    });

    app.use('/', router);
};

module.exports = attach;
