const BaseData = require('./base-data');
const ProductModel = require('./models/product-model');
const ModelState = require('./model-state');

class ProductData extends BaseData {
    constructor(db) {
        super(db, ProductModel, ProductModel);
    }

    // override base
    create(productModel) {
        if (!productModel) {
            return Promise.reject(['model-missing']);
        }

        productModel.dateCreated = new Date();
        productModel.viewsCount = 0;
        return super.create(productModel);
    }
}

module.exports = ProductData;
