const UsersData = require('./users-data');
const ImagesData = require('./images-data');
const ProductsData = require('./products-data');

const init = (db) => {
    return {
        users: new UsersData(db),
        images: new ImagesData(db),
        products: new ProductsData(db),
    };
};

module.exports = {
    init,
};
