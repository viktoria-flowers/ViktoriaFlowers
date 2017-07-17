/* globals: Buffer */
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { ObjectID } = require('mongodb');
const { authHelper } = require('./../utils');

const serverRoutes = (app, data) => {
    // https://scotch.io/tutorials/easy-node-authentication-setup-and-local#toc-routes-approutesjs
    // route middleware to make sure a user is logged in
    const isLoggedIn = (req, res, next) => {
        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated()) {
            return next();
        }

        // if they aren't redirect them to the home page
        res.status(401);
        return res.redirect('/login');
    };

    // Midleware to set a current user accessible in pug views
    app.use('/', (req, res, next) => {
        res.locals.isAuthenticated = !!req.user;
        res.locals.username = !req.user ? '' : req.user.username;
        next();
    });

    app.get('/', (req, res) => res.render('home'));
    app.get('/home', (req, res) => res.render('home'));
    app.get('/bouquets/create', (req, res) => res.render('bouquets/create'));
    app.post('/bouquets/create', upload.single('image'), (req, res) => {
        const modelState = data.bouquets.validate(req.body);
        // Need to validate the object first
        if (!modelState.isValid) {
            return res.render('/bouquets/create', {
                errors: modelState.errors,
                context: req.body,
            });
        }

        return data.images.create(req.file).then((newImg) => {
            req.body.url = `/images/${newImg._id}/${newImg.originalname}`;
            data.bouquets.create(req.body).then((bouquete) => {
                return res.redirect(`/bouquets/details/${bouquete._id}`);
            });
        });
    });

    app.get('/images/:id/:name/', (req, res) => {
        if (!req.params.id || !req.params.name) {
            return res.redirect('/not-found');
        }

        return data.images.getAll({
            originalname: req.params.name,
            _id: new ObjectID(req.params.id),
        })
            .then((images) => {
                if (!images[0]) {
                    return res.redirect('/not-found');
                }

                return res.end(images[0].buffer.buffer);
            });
    });

    app.get('/bouquets-circle', (req, res) => res.render('bouquets-circle'));
    app.get('/bouquets-tall', (req, res) => res.render('bouquets-tall'));
    app.get('/bouquets-wedding', (req, res) => res.render('bouquets-wedding'));
    app.get('/bouquets-extraordinary', (req, res) =>
        res.render('bouquets-extraordinary'));
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
    app.get('/checkout', (req, res) => res.render('checkout'));
    app.get('/register', (req, res) => res.render('register'));
    app.get('/login', (req, res) => res.render('login'));
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/home');
    });

    app.post('/profile', isLoggedIn, (req, res) => {
        /* This is done because mongodb ids are ObjectIDs and we are trying to 
        send it a string as an ID, this is why we convert it into an ObjectID */
        const convertStringToObjectID = new ObjectID(req.user._id);
        req.body._id = convertStringToObjectID;

        if (req.body.password.length === 0) {
            req.body.password = req.user.password;
            data.users.updateById(req.body);
        } else {
            req.body.password = authHelper
                                    .makeHashFromPassword(req.body.password);
            data.users.updateById(req.body);
        }
        res.send(req.body);
    });
};

module.exports = serverRoutes;
