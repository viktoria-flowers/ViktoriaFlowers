const UsersData = require('./users-data');
const ImagesData = require('./images-data');
const BouquetsData = require('./bouquets-data');

const init = (db) => {
    return {
        users: new UsersData(db),
        images: new ImagesData(db),
        bouquets: new BouquetsData(db),
    };
};

module.exports = {
    init,
};
