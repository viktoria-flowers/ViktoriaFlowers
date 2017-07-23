const ModelState = require('../model-state');
const { constants } = require('../../app/utils');

const minTitleLength = 3;
const minPrice = 1;

class Product {
    static isValid(productModel) {
        const modelState = new ModelState();

        if (!productModel) {
            modelState.addError(constants.MISSING_MODEL_ERR);
            return modelState;
        }

        if (!productModel.title || productModel.title.length < minTitleLength) {
            modelState.addError('title');
        }

        if (!productModel.description) {
            modelState.addError('description');
        }

        if (!productModel.price || productModel.price < minPrice) {
            modelState.addError('price');
        }

        return modelState;
    }
}

module.exports = Product;
