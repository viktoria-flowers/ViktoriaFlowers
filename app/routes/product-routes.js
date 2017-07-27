const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { isAdmin } = require('../middlewares');

const productRoutes = (app, productController) => {
    app.get('/products/create', isAdmin, (req, res) => {
        return productController.getCreateProduct(req, res);
    });

    app.get('/products/details/:id', (req, res) => {
        return productController.getDetailsProduct(req, res);
    });

    app.get('/products/delete', isAdmin, (req, res) => {
        return productController.getDeleteProducts(req, res);
    });

    app.post(
        '/products/create',
        isAdmin,
        upload.single('image'),
        (req, res) => {
            return productController.postCreateProduct(req, res);
        });

    app.get('/products/:type*?', (req, res) => {
        return productController.getProducts(req, res);
    });
};

module.exports = productRoutes;
