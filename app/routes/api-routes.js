const { isAdmin, isLoggedIn } = require('../middlewares');

const ajaxRequests = (app, apiController) => {
    app.get('/api/autocomplete', (req, res) => {
        return apiController.getAutoComplete(req, res);
    });

    app.post('/api/subscribe', (req, res) => {
        return apiController.postSubscribe(req, res);
    });

    app.post('/api/delete-product', isAdmin, (req, res) => {
        return apiController.deleteProduct(req, res);
    });

    app.post('/api/contactUs', (req, res) => {
        return apiController.postContactUs(req, res);
    });

    app.post('/api/checkout', isLoggedIn, (req, res) => {
        return apiController.postCheckout(req, res);
    });

    app.get('/api/products/:type*?', (req, res) => {
        return apiController.getProducts(req, res);
    });

    app.post('/api/create-admin', isAdmin, (req, res) => {
        return apiController.postSetUserAsAdmin(req, res);
    });

    app.post('/api/favorites', isLoggedIn, (req, res) => {
        return apiController.postFavorites(req, res);
    });
};

module.exports = ajaxRequests;
