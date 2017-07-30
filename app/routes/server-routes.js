const { setLocals } = require('../middlewares');
const { isAdmin } = require('../middlewares');

const serverRoutes = (app, controllers) => {
    app.use('/', setLocals);

    app.get('/', (req, res) => {
        return controllers.productController.getTopProductsForHomePage(req, res);
    });

    app.get('/home', (req, res) => {
        return controllers.productController.getTopProductsForHomePage(req, res);
    });

    app.get('/search/:title', (req, res) => {
        controllers.productController.getProductByTitle(req, res);
    });

    app.get('/userslist', isAdmin, (req, res) => {
        return controllers.usersController.getAllUsers(req, res);
    });

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
    app.get('/checkout', (req, res) => res.render('checkout'));
};

module.exports = serverRoutes;
