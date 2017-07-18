const ModelState = require('../model-state');

const minTitleLength = 3;

class Bouquete {
    static isValid(bouquteModel) {
        const modelState = new ModelState(false);

        if (!bouquteModel.title || bouquteModel.title.length < minTitleLength) {
            modelState.addError('title');
        }

        if (!bouquteModel.description) {
            modelState.addError('description');
        }

        if (!bouquteModel.price) {
            modelState.addError('price');
        }

        if (!modelState.errors || modelState.errors.length === 0) {
            modelState.isValid = true;
        }

        return modelState;
    }
}

module.exports = Bouquete;
