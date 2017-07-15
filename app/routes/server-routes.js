const serverRoutes = (app) => {
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
    app.get('/bouquets', (req, res) => res.render('bouquets'));
    app.get('/baskets', (req, res) => res.render('baskets'));
    app.get('/pots', (req, res) => res.render('pots'));
    app.get('/cards', (req, res) => res.render('cards'));
    app.get('/cart', (req, res) => res.render('cart'));
    app.get('/payment', (req, res) => res.render('payment'));
    app.get('/payment-details', (req, res) => res.render('payment-details'));
    app.get('/delivery', (req, res) => res.render('delivery'));
    app.get('/contacts', (req, res) => res.render('contacts'));
    app.get('/product-info/:id', (req, res) => res.render('product-info'));
    app.get('/profile', isLoggedIn, (req, res) => res.render('profile'));
    app.get('/register', (req, res) => res.render('register'));
    app.get('/login', (req, res) => res.render('login'));
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/home');
    });
};

module.exports = serverRoutes;
