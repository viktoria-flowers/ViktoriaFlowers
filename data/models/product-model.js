const ModelState = require('../model-state');

const minTitleLength = 3;

class Product {
    static isValid(productModel) {
        const modelState = new ModelState(false);

        if (!productModel.title || productModel.title.length < minTitleLength) {
            modelState.addError('title');
        }

        if (!productModel.description) {
            modelState.addError('description');
        }

        if (!productModel.price) {
            modelState.addError('price');
        }

        if (!modelState.errors || modelState.errors.length === 0) {
            modelState.isValid = true;
        }

        return modelState;
    }
}

module.exports = Product;
