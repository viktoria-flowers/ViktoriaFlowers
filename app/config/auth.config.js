const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { Strategy } = require('passport-local').Strategy;
const { authHelper } = require('../utils');

const configAuth = (app, { users }) => {
    passport.use(new Strategy(
        (username, password, done) => {
            return users.findByUsername(username)
                .then((user) => {
                    const passHash = authHelper.makeHashFromPassword(password);
                    if (user.password !== passHash) {
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
    
    // unique key for encrypting cookie
    app.use(session({
        secret: 'Yellow Unicorn',
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    // return/generate cookie to the user
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // find the user from cookie
    passport.deserializeUser((id, done) => {
        return users.findById(id)
            .then((user) => {
                return done(null, user);
            })
            .catch(done);
    });
};

module.exports = configAuth;
