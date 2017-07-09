const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local').Strategy;

const configAuth = (app, { users }) => {
    passport.use(new Strategy(
        (username, password, done) => {
            return users.findByUsername(username)
                .then((user) => {
                    if (user.password !== password) {
                        done(new Error('Invalid password'));
                    }
                    return done(null, user);
                })
                .catch((err) => {
                    return done(err);
                });
        }
    ));

    app.use(cookieParser());
    // Unique key for encrypting cookie
    app.use(session({
        secret: 'Yellow Unicorn',
        resave: true, saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // How do we want to return/generate cookie to the user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // How by given cookie to find the user
    passport.deserializeUser((id, done) => {
        return users.findById(id)
            .then((user) => {
                return done(null, user);
            })
            .catch(done);
    });
};

module.exports = configAuth;
