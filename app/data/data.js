const UsersData = require('./users.data');

const init = (db) => {
    return {
        users: new UsersData(db),
    };
};

module.exports = {
    init,
};
