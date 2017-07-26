const BaseData = require('./base-data');
const ImageModel = require('../data/models/image-model');

class ImagesData extends BaseData {
    constructor(db) {
        super(db, ImageModel, ImageModel);
    }

    // override base
    create(imageModel) {
        if (!imageModel) {
            return Promise.reject(['model-missing']);
        }
        
        // replace white spaces with underscore "_"
        imageModel.originalname = imageModel.originalname.replace(/\s+/g, '_');
        imageModel.dateCreated = new Date();
        return super.create(imageModel);
    }
}

module.exports = ImagesData;
