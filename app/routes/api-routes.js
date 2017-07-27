const { isAdmin } = require('../middlewares');
const { isLoggedIn } = require('../middlewares');

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
        return data.products.findAllRecordsByIds(req.body.ids)
            .then((foundProduct) => {
                res.send(foundProduct);
            });
    });

    app.get('/api/products/:type*?', (req, res) => {
        return apiController.getProducts(req, res);
    });
};

module.exports = ajaxRequests;
