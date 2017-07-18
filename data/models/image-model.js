const ModelState = require('../model-state');

const twoMegaBytesInBytes = 1000 * 2000;

class Image {
    static isValid(imageModel) {
        const modelState = new ModelState(false);

        // allow images less than 2MB
        // size of the image in bytes
        if (imageModel.size <= twoMegaBytesInBytes) {
            modelState.isValid = true;
            return modelState;
        }

        modelState.addError('size');
        return modelState;
    }
}

module.exports = Image;
