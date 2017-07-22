const ModelState = require('../model-state');

const minTitleLength = 3;

class Product {
    static isValid(productModel) {
        const modelState = new ModelState();

        if (!productModel.title || productModel.title.length < minTitleLength) {
            modelState.addError('title');
        }

        if (!productModel.description) {
            modelState.addError('description');
        }

        if (!productModel.price) {
            modelState.addError('price');
        }

        return modelState;
    }
}

module.exports = Product;
