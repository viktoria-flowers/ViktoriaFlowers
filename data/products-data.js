const BaseData = require('./base-data');
const ProductModel = require('./models/product-model');

class ProductData extends BaseData {
    constructor(db) {
        super(db, ProductModel, ProductModel);
    }

    // override base
    create(productModel) {
        productModel.dateCreated = new Date();
        productModel.viewsCount = 0;
        return super.create(productModel);
    }
}

module.exports = ProductData;
