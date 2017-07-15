const serverRoutes = (app) => {
    // Midleware to set a current user accessible in pug views
    app.use('/', (req, res, next) => {
        res.locals.isAuthenticated = !!req.user;
        res.locals.username = !req.user ? '' : req.user.username;
        next();
    });

    app.get('/', (req, res) => res.render('home'));
    app.get('/home', (req, res) => res.render('home'));
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
    app.get('/checkout', (req, res) => res.render('checkout'));
    app.get('/profile', (req, res) => res.render('profile'));
    app.get('/register', (req, res) => res.render('register'));
    app.get('/login', (req, res) => res.render('login'));
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('home');
    });
};

module.exports = serverRoutes;
