const { authHelper } = require('./utils/index');

const seedDatabase = (data) => {
    data.users.getAll({ username: 'admin11' })
        .then((users) => {
            if (users.length === 0) {
                const initialAdmin = {
                    username: 'admin11',
                    password: authHelper.makeHashFromPassword('pe6oadmin4eto'),
                    names: 'admin',
                    phone: '0888888888',
                    email: 'abv@abv.bg',
                    orders: [],
                    favorites: [],
                    contactInfo: 'admin contact info',
                    roles: ['admin'],
                };

                data.users.collection.insert(initialAdmin);
            }
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports({ seedDatabase });
