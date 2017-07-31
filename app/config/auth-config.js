const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local').Strategy;
const { authHelper } = require('../utils');
const UserModel = require('../../data/models/user-model');

const configAuth = (app, users) => {
    passport.use(new Strategy(
        (username, password, done) => {
            return users.findByUsername(username)
                .then((user) => {
                    const passHash = authHelper.makeHashFromPassword(password);
                    if (!user || user.password !== passHash) {
                        return done(new Error('Invalid credentials'));
                    }

                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
        }
    ));

    app.use(cookieParser());
    // unique key for encrypting cookie
    app.use(session({
        secret: 'Yellow Unicorn',
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        const serializedUser = UserModel.toViewModel(user);
        done(null, serializedUser.id);
    });

    passport.deserializeUser((id, done) => {
        return users.findById(id)
            .then((user) => {
                return done(null, user);
            })
            .catch(done);
    });
};

module.exports = configAuth;
