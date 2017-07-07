const serverRoutes = function(app) {
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
    app.get('/profile', (req, res) => res.render('profile'));
    app.get('/register', (req, res) => res.render('register'));
    app.get('/login', (req, res) => res.render('login'));
    app.get('/logout', (req, res) => res.redirect('home')); // redirect to home
};

module.exports = serverRoutes;
