const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { isAdmin } = require('../middlewares');
const { ObjectID } = require('mongodb');
const productTypes = require('../utils/productTypes');

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

        return data.products.getAll(filter)
            .then((products) => {
                // return res.json(products);
                return res.render('products/list', {
                    products: products,
                });
            });
    });
};

module.exports = productRoutes;
