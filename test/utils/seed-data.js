const testProducts = require('../utils/test-products');

const seed = (db) => {
    const modifiedProducts = testProducts.map((prod) => {
        prod.url = '/static/images/wedding.jpg';
        if (prod.type === 'cards') {
            prod.type = 'pots';
        }

        return prod;
    });

    db.collection('products').insertMany(modifiedProducts);
    return Promise.resolve(db);
};

module.exports = { seed };
