const { setLocals } = require('../middlewares');
const { isAdmin } = require('../middlewares');

const serverRoutes = (app, usersController) => {
    app.use('/', setLocals);
    app.get('/', (req, res) => res.render('home'));
    app.get('/home', (req, res) => res.render('home'));
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
