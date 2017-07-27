const UsersData = require('./users-data');
const ImagesData = require('./images-data');
const ProductsData = require('./products-data');
const EmailSubscriberData = require('./emailSubscription-data');
const ContactUsUsersData = require('./user-contact-data');

const init = (db) => {
    return {
        users: new UsersData(db),
        images: new ImagesData(db),
        products: new ProductsData(db),
        emailSubscribers: new EmailSubscriberData(db),
        contactUsUsers: new ContactUsUsersData(db),
    };
};

module.exports = { init };
