const { setLocals } = require('../middlewares');
const { isAdmin } = require('../middlewares');

const serverRoutes = (app, usersController) => {
    app.use('/', setLocals);


    app.get('/', (req, res) => {
        let sortViewsObj = { viewsCount: -1 };
        let sortNewsesObj = { dateCreated: 1 };

        Promise.resolve;
        data.products.getAll({}, sortViewsObj, 1, 6)
            .then((topViewed) => {
                data.products.getAll({}, sortNewsesObj, 1, 6)
                    .then((topNewest) => {
                        var products = { topNewest: topNewest, topViewed: topViewed };

                        return res.render('home', products);
                    });
            });
    });

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
    app.get('/checkout', (req, res) => res.render('checkout'));
    app.get('/userslist', isAdmin, (req, res) => {
        return usersController.getAllUsers(req, res);
    });
};

module.exports = serverRoutes;
