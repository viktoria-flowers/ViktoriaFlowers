const ModelState = require('../model-state');
const { constants } = require('../../app/utils');

const twoMegaBytesInBytes = 1000 * 2000;

class Image {
    static isValid(imageModel) {
        const modelState = new ModelState();

        if (!imageModel) {
            modelState.addError(constants.MISSING_MODEL_ERR);
            return modelState;
        }

        // allow images less than 2MB
        // size of the image in bytes
        if (!imageModel.size || imageModel.size > twoMegaBytesInBytes) {
            modelState.addError('size');
        }

        return modelState;
    }
}

module.exports = Image;
