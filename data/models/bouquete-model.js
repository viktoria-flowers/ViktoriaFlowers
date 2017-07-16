const ModelState = require('../model-state');

class Bouquete {
    static isValid(bouquteModel) {
        const modelState = new ModelState(false);

        if (!bouquteModel.title) {
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
