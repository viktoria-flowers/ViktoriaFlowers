const { ObjectID } = require('mongodb');

const imageRoutes = (app, data) => {
    app.get('/images/:id/:name/', (req, res) => {
        if (!req.params.id || !req.params.name) {
            return res.redirect('/not-found');
        }

        return data.images.getAll({
            originalname: req.params.name,
            _id: new ObjectID(req.params.id),
        })
            .then((images) => {
                if (!images[0]) {
                    return res.redirect('/not-found');
                }

                return res.end(images[0].buffer.buffer);
            });
    });
};

module.exports = imageRoutes;
