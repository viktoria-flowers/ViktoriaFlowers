const { makeHashFromPassword } = require('../data');

const mockUsers = [{
    id: 1,
    username: 'admin',
    password: makeHashFromPassword('admin'),
    roles: ['administrator'],
}];

console.log(mockUsers[0]);

const findByUserName = (username) => {
    const dbUser = mockUsers.find((user) => user.username === username);
    return new Promise((resolve, reject) => {
        if (!dbUser) {
            return reject('User not found');
        }

        // first parameter is error
        return resolve(null, dbUser);
    });
};

const findById = (id) => {
    if (!id) {
        throw new Error('Id is requireasdd');
    }

    id = parseInt(id, 10);
    const dbUser = mockUsers.find((user) => user.id === id);
    return new Promise((resolve, reject) => {
        if (!dbUser) {
            return reject('User not found');
        }

        // first parameter is error
        return resolve(null, dbUser);
    });
};

module.exports = { findByUserName, findById };
