const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const expressSession= require('express-session');

const algoritm = 'sha256';
const defaultSalt = '7d6fc41917953';
const hashEncoding = 'hex';
const passportSessionSecret = 'Batman';

const configAuth = (app, userData) => {
    passport.use(new LocalStrategy((username, password, done) => {
        userData.findByUserName(username)
            .then((user) => {
                if (!user) {
                    return done('User doesn\'t not exits', null);
                }

                if (user.password !== makeHashFromPassword(password)) {
                    return done('Incorrect credentials', null);
                }

                return done(null, user);
            });
    }));

    app.use(cookieParser());
    app.use(expressSession({ secret: passportSessionSecret }));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        userData.findById(id)
            .then((user) => {
                done(user);
            })
            .catch(done);
    });
};

const makeHashFromPassword = (password, salt) => {
    salt = salt || defaultSalt;

    if (!password || (!!password.length && password.length === 0)) {
        throw new Error('The password is required');
    }

    return crypto.createHmac(algoritm, salt)
        .update(password)
        .digest(hashEncoding);
};


module.exports = configAuth;
