const { constants, pagination, productTypes } = require('../utils');

const ajaxRequests = (app, data) => {

    app.post('/api/autocomplete', (req, res) => {
        return data.products.getAll(req.body)
            .then((products) => {
                
                if (products.length === 0) {
                    return res.status(400);
                }

                let filteredProducts = products.filter((prod) => {
                    return prod.title.includes('');
                });

                // for test
                // let data = ['pesho', 'gosho', 'sasho'];
                return res.status(200).json(
                    { data: data }
                )
                    .catch((err) => {
                        return res.status(400).json(err);
                    });
            });
    });

    app.post('/api/subscribe', (req, res) => {
        // { subscribeEmail : 'marti@sada.com'  }

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

    app.get('/api/products/:type*?', function (req, res) {
        const type = req.params.type;
        if (type && productTypes.indexOf(type) === -1) {
            return res.json({ message: `Wrong type: ${type}` });
        }

        const page = +req.query.page || 1;
        const sortField = req.query.sortField || constants.DEFAULT_SORT_FIELD;
        const sortType = req.query.sortType || constants.DEFAULT_SORT_TYPE;

        // This will be initalizated in then() handlers
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
