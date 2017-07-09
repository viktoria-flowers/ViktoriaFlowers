const usersList = [{
    id: 1,
    username: 'Marti',
    password: 'ala',
}];

const users = {
    findById(id) {
        id = +id;
        const user = usersList.find((u) => u.id === id);
        return new Promise((resolve, reject) => {
            if (!user) {
                console.log('Wrong');
                return reject('No such user');
            }
            return resolve(user);
        });
    },
    findByUsername(username) {
        const usernameToLower = username.toLowerCase();
        const user = usersList.find((u) =>
            u.username.toLowerCase() === usernameToLower);
        return new Promise((resolve, reject) => {
            if (!user) {
                console.log('Wrong 2');
                return reject('No such user');
            }
            return resolve(user);
        });
    },
};

module.exports = {
    users,
};
