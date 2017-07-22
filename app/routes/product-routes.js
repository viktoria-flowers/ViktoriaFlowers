const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { isAdmin } = require('../middlewares');
const { ObjectID } = require('mongodb');
const { productTypes, pagination, constants } = require('../utils');

const productRoutes = (app, data) => {
    app.get(
        '/products/create',
        isAdmin,
        (req, res) => res.render('products/create'));

    app.get('/products/details/:id', (req, res) => {
        if (!req.params.id || !ObjectID.isValid(req.params.id)) {
            return res.redirect('/NotFound');
        }

        return data.products.findById(req.params.id).then((product) => {
            if (!product) {
                res.status(404);
                return res.redirect('/NotFound');
            }

            return data.products
                .updateParamsById(product, { viewsCount: ++product.viewsCount })
                .then(() => {
                    return res.render(
                        'products/details', { model: product });
                });
        });
    });

    app.post(
        '/products/create',
        isAdmin,
        upload.single('image'), (req, res) => {
            const modelState = data.products.validate(req.body);
            // Need to validate the object first
            if (!modelState.isValid) {
                return res.render('products/create', {
                    errors: modelState.errors,
                    model: req.body,
                });
            }

            return data.images.create(req.file)
                .then((newImg) => {
                    const url = `/images/${newImg._id}/${newImg.originalname}`;
                    req.body.url = url;
                    return data.products.create(req.body);
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
        });

    // GET /products/
    // GET /products/tall
    // GET /products/extraordinary
    // GET /products/circle
    // GET /products/wedding
    app.get('/products/:type*?', (req, res) => {
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
        const sort = { };
        sort[field] = sortType;
        // get fo the first page
        return data.products.getAll(filter, sort)
            .then((firstPageProducts) => {
                productModels = firstPageProducts;

                // get All 
                const pageSize = Number.MAX_SAFE_INTEGER;
                return data.products.getAll(filter, {}, 1, pageSize);
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
    });
};

module.exports = productRoutes;
