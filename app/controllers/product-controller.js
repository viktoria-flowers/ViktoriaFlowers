const { ObjectID } = require('mongodb');
const { productTypes, pagination, constants } = require('../utils');

class ProductController {
    constructor(data) {
        this._data = data;
    }

    getCreateProduct(req, res) {
        return res.render('products/create');
    }

    getDetailsProduct(req, res) {
        if (!req.params.id || !ObjectID.isValid(req.params.id)) {
            return res.redirect('/NotFound');
        }

        return this._data.products.findById(req.params.id).then((product) => {
            if (!product) {
                res.status(404);
                return res.redirect('/NotFound');
            }

            return this._data.products
                .updateParamsById(product, { viewsCount: ++product.viewsCount })
                .then(() => {
                    return res.render(
                        'products/details', { model: product });
                });
        });
    }
    postCreateProduct(req, res) {
        const modelState = this._data.products.validate(req.body);
        // Need to validate the object first
        if (!modelState.isValid) {
            return res.render('products/create', {
                errors: modelState.errors,
                model: req.body,
            });
        }

        return this._data.images.create(req.file)
            .then((newImg) => {
                const url = `/images/${newImg._id}/${newImg.originalname}`;
                req.body.url = url;
                return this._data.products.create(req.body);
            })
            .then((product) => {
                return res.redirect(`/products/details/${product._id}`);
            })
            .catch((errors) => {
                return res.render('products/create', {
                    model: req.body,
                    errors: errors,
                });
            });
    }

    getProducts(req, res) {
        const filter = {};
        const type = req.params.type;
        if (type) {
            if (productTypes.indexOf(type) === -1) {
                return res.redirect('/NotFound');
            }

            filter.type = type;
        }

        let productModels = [];

        const field = constants.DEFAULT_SORT_FIELD;
        const sortType = constants.DEFAULT_SORT_TYPE;
        const sort = {};
        sort[field] = sortType;
        // get fo the first page
        return this._data.products.getAll(filter, sort)
            .then((firstPageProducts) => {
                productModels = firstPageProducts;

                // get All 
                const pageSize = Number.MAX_SAFE_INTEGER;
                return this._data.products.getAll(filter, {}, 1, pageSize);
            })
            .then((allProds) => {
                const pages = pagination(
                    allProds.length,
                    constants.DEFAULT_PAGE_SIZE,
                    1);

                return res.render('products/list', {
                    products: productModels,
                    type: type,
                    pages: pages,
                });
            });
    }

    getDeleteProducts(req, res) {
        return this._data.products
            .getAll(null, null, null, Number.MAX_SAFE_INTEGER)
            .then((products) => {
                const pugView = 'products/delete-products';
                return res.render(pugView, { productsList: products });
            });
    }

    getTopProductsForHomePage(req, res) {
        let sortViewsObj = { viewsCount: -1 };
        let sortNewsesObj = { dateCreated: 1 };

        return this._data.products.getAll({}, sortViewsObj, 1, 6)
            .then((topViewed) => {
                this._data.products.getAll({}, sortNewsesObj, 1, 6)
                    .then((topNewest) => {
                        var products = { topNewest: topNewest, topViewed: topViewed };

                        return res.render('home', products);
                    });
            });
    }
}

module.exports = ProductController;
