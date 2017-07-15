const { authHelper } = require('../app/utils');
const UsersData = require('./users-data');

const init = (db) => {
    return Promise.resolve({
        items: new UsersData(db),
    });
};

module.exports = {
    init,
};
