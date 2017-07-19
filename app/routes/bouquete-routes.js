const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { isAdmin } = require('../middlewares');
const { ObjectID } = require('mongodb');

const bouquetesRoutes = (app, data) => {
    app.get(
        '/bouquets/create',
        isAdmin,
        (req, res) => res.render('bouquets/create'));

    app.get('/bouquets/details/:id', (req, res) => {
        if (!req.params.id || !ObjectID.isValid(req.params.id)) {
            return res.redirect('/NotFound');
        }

        return data.bouquets.findById(req.params.id).then((bouquete) => {
            if (!bouquete) {
                res.status(404);
                return res.redirect('/NotFound');
            }

            return data.bouquets
                .updateParamsById(bouquete, { viewsCount: ++bouquete.viewsCount })
                .then(() => {
                    return res.render(
                        'bouquets/details', { model: bouquete });
                });
        });
    });

    app.post(
        '/bouquets/create',
        isAdmin,
        upload.single('image'), (req, res) => {
            const modelState = data.bouquets.validate(req.body);
            // Need to validate the object first
            if (!modelState.isValid) {
                return res.render('bouquets/create', {
                    errors: modelState.errors,
                    model: req.body,
                });
            }

            return data.images.create(req.file)
                .then((newImg) => {
                    const url = `/images/${newImg._id}/${newImg.originalname}`;
                    req.body.url = url;
                    return data.bouquets.create(req.body);
                })
                .then((bouquete) => {
                    return res.redirect(`/bouquets/details/${bouquete._id}`);
                })
                .catch((errors) => {
                    return res.render('bouquets/create', {
                        model: req.body,
                        errors: errors,
                    });
                });
        });


    app.get('/bouquets-circle', (req, res) =>
        data.bouquets.getAll().then((single) => {
            return res.render('bouquets-circle', { single: single });
        })
    );
    app.get('/bouquets-tall', (req, res) =>
        data.bouquets.getAll().then((single) => {
            return res.render('bouquets-tall', { single: single });
        })
    );
    app.get('/bouquets-wedding', (req, res) =>
        data.bouquets.getAll().then((single) => {
            return res.render('bouquets-wedding', { single: single });
        })
    );
    app.get('/bouquets-extraordinary', (req, res) =>
        data.bouquets.getAll().then((single) => {
            return res.render('bouquets-extraordinary', { single: single });
        })
    );
};

module.exports = bouquetesRoutes;
