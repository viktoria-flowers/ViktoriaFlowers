const UsersData = require('./users-data');
const ImagesData = require('./images-data');
const ProductsData = require('./products-data');
const EmailSubscriberData = require('./emailSubscription-data');

const init = (db) => {
    return {
        users: new UsersData(db),
        images: new ImagesData(db),
        products: new ProductsData(db),
        emailSubscribers: new EmailSubscriberData(db),
    };
};

module.exports = {
    init,
};
