class AuthController {
    constructor(data) {
        this._data = data;
    }

    postLogin(req, res, next, passport) {
        return passport.authenticate('local', (err, user, info) => {
            const model = {};
            model.username = req.body.username;
            if (err) {
                model.err = err.message;
                return res.render('login', { model: model });
            }

            return req.login(user, () => {
                return res.redirect('/');
            });
        })(req, res, next);
    }

    postRegister(req, res) {
        return this._data.users.create(req.body)
            .then((user) => {
                req.logIn(user, (err) => {
                    if (err) {
                        res.redirect('/login');
                    }

                    res.redirect('/profile');
                });
            })
            .catch((err) => {
                res.render('register', {
                    model: req.body,
                    errors: err,
                });
            });
    }

    logOut(req, res) {
        req.logout();
        return res.redirect('/home');
    }

    getLogin(req, res) {
        return res.render('login');
    }

    getRegister(req, res) {
       return res.render('register');
    }
}

module.exports = AuthController;
