// const { authHelper } = require('../app/utils');
const UsersData = require('./users-data');

const init = (db) => {
    return {
        items: new UsersData(db),
    };
};

module.exports = {
    init,
};
