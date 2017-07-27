class AuthController {
    constructor(data) {
        this._data = data;
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
