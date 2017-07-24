/* globals: Buffer */

const { ObjectID } = require('mongodb');
const { authHelper } = require('./../utils');
const { isLoggedIn } = require('../middlewares');

const serverRoutes = (app, data) => {
    // Middleware to set a current user accessible in pug views
    app.use('/', (req, res, next) => {
        res.locals.isAuthenticated = !!req.user;
        res.locals.username = !req.user ? '' : req.user.username;

        // set isAdmin
        if (req.user && req.user.roles.indexOf('admin') !== -1) {
            res.locals.isAdmin = true;
        }

        next();
    });

    app.get('/', (req, res) => res.render('home'));
    app.get('/home', (req, res) => res.render('home'));
    app.get('/baskets', (req, res) => res.render('baskets'));
    app.get('/pots', (req, res) => res.render('pots'));
    app.get('/cards', (req, res) => res.render('cards'));
    app.get('/cart', (req, res) => res.render('cart'));
    app.get('/payment', (req, res) => res.render('payment'));
    app.get('/payOnDelivery', (req, res) => res.render('payOnDelivery'));
    app.get('/paypal-payment', (req, res) => res.render('paypal-payment'));
    app.get('/card-payment', (req, res) => res.render('card-payment'));
    app.get('/delivery', (req, res) => res.render('delivery'));
    app.get('/contacts', (req, res) => res.render('contacts'));
    app.get('/product-info/:id', (req, res) => res.render('product-info'));
    app.get('/profile', isLoggedIn, (req, res) =>
        data.users.getAll(req.user._id).then((user) => {
            return res.render('profile', { user: user[0] });
        }));
    app.get('/profile-edit', isLoggedIn, (req, res) =>
        data.users.getAll(req.user._id).then((user) => {
            return res.render('profile-edit', { user: user[0] });
        }));
    app.get('/checkout', (req, res) => res.render('checkout'));
    app.get('/register', (req, res) => res.render('register'));
    app.get('/login', (req, res) => res.render('login'));
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/home');
    });

    app.post('/profile-edit', isLoggedIn, (req, res) => {
        /* This is done because mongodb ids are ObjectIDs and we are trying to 
        send it a string as an ID, this is why we convert it into an ObjectID */
        const convertStringToObjectID = new ObjectID(req.user._id);
        req.body._id = convertStringToObjectID;
        if (req.body.password.length === 0) {
            req.body.password = req.user.password;

            data.users.updateWholeObjectById(req.body).then(() => {
                res.redirect('/profile');
            }, (error) => {
                res.redirect('/profile-edit');
            });
        } else {
            req.body.password = authHelper
                .makeHashFromPassword(req.body.password);
            data.users.updateWholeObjectById(req.body)
                .then((updatedUser, error) => {
                    res.redirect('/profile');
                }, (error) => {
                    res.redirect('/profile-edit');
                });
        }
    });

    // to do find out a better way of giving 'isActive', false, 
    // what if they are many?
    // the route path should be '/delete'
    app.post('/', isLoggedIn, (req, res) => {
        const convertStringToObjectID = new ObjectID(req.user._id);
        req.body._id = convertStringToObjectID;
        req.body.isActive = req.user.isActive;

        data.users.updateParamsById(req.body, { isActive: false })
            .then(() => {
                res.send('OK');
            }, (error) => {
                console.log(error);
                res.send('NOT OK');
            });
    });
};

module.exports = serverRoutes;
