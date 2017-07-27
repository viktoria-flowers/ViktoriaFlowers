const { ObjectID } = require('mongodb');

class ImagesController {
    constructor(data) {
        this._data = data;
    }

    getImage(req, res) {
        if (!req.params.id || !req.params.name) {
            return res.redirect('/not-found');
        }

        return this._data.images.getAll({
            originalname: req.params.name,
            _id: new ObjectID(req.params.id),
        })
            .then((images) => {
                if (!images[0]) {
                    return res.redirect('/not-found');
                }

                return res.end(images[0].buffer.buffer);
            });
    }
}

module.exports = ImagesController;
