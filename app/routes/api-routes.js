const { constants, pagination, productTypes } = require('../utils');
const { isAdmin } = require('../middlewares');

const ajaxRequests = (app, data) => {
    app.get('/api/autocomplete', (req, res) => {
        const regex = new RegExp(req.query.name);
        const query = { 'title': regex };

        return data.products.getAll(query)
            .then((products) => {
                if (products.length === 0) {
                    return res.status(400);
                }

                const productNames = products.map((p) => {
                    return p.title;
                });
                console.log(productNames);

                return res.status(200).json(productNames);
            })
            .catch((err) => {
                return res.status(400).json(err);
            });
    });

    app.post('/api/subscribe', (req, res) => {
        return data.emailSubscribers.getAll(req.body)
            .then((existingEmail) => {
                if (existingEmail.length > 0) {
                    return res.status(400).json('email-exists');
                }

                return data.emailSubscribers.create(req.body)
                    .then((newEmail) => {
                        return res.status(200).json(
                            { message: 'E-mail added in the list' }
                        );
                    })
                    .catch((err) => {
                        return res.status(400).json(err);
                    });
            });
    });

    app.post('/api/delete-product', isAdmin, (req, res) => {
        return data.products.removeObjectById(req.body)
            .then((deletedProduct) => {
                res.status(200).json(
                    { message: 'OK' }
                );
            });
    });

    app.post('/api/contactUs', (req, res) => {
        return data.contactUsUsers.create(req.body)
            .then((contactUsDataSend) => {
                return res.status(200).json(
                    { message: 'OK' }
                );
            })
            .catch((err) => {
                return res.status(400).json(err);
            });
    });

    app.get('/api/products/:type*?', (req, res) => {
        const type = req.params.type;
        if (type && productTypes.indexOf(type) === -1) {
            return res.json({ message: `Wrong type: ${type}` });
        }

        const page = +req.query.page || 1;
        const sortField = req.query.sortField || constants.DEFAULT_SORT_FIELD;
        const sortType = req.query.sortType || constants.DEFAULT_SORT_TYPE;

        // This will be initialized in then() handlers
        let productsModels = [];
        const filter = {};
        if (type) {
            filter.type = type;
        }

        const sort = {};
        sort[sortField] = +sortType;

        return data.products.getAll(filter, sort, page)
            .then((products) => {
                productsModels = products;
                return data.products
                    .getAll(filter, {}, 1, Number.MAX_SAFE_INTEGER);
            })
            .then((allProds) => {
                const pages = pagination(
                    allProds.length,
                    constants.DEFAULT_PAGE_SIZE,
                    page);

                return res.render('products/list-partial', {
                    products: productsModels,
                    pages: pages,
                });
            })
            .catch((err) => res.status(400)
                .res.json(err));
    });
};

module.exports = ajaxRequests;
