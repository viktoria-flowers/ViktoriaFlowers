const express = require('express');
const { authHelper } = require('./utils/index');

const init = (data) => {
    const app = express();

    data.users.getAll({ username: 'admin' })
        .then((users) => {
            if (users.length === 0) {
                let initialAdmin = {
                    username: 'admin',
                    password: authHelper.makeHashFromPassword('pe6oadmin4eto'),
                    names : 'admin',
                    phone: '0888888888',
                    email: 'abv@abv.bg',
                    contactInfo: 'admin contact info',
                };

                data.users.collection.insert(initialAdmin);
            }
        });


    const controllers = require('./controllers/init').init(data);

    // folder app/config
    require('./config/app-config')(app);
    require('./config/auth-config')(app, data.users);

    // folder app/routes
    require('./routes/server-routes')(app, controllers);
    require('./routes/auth-routes')(app, controllers.authController);
    require('./routes/api-routes')(app, controllers.apiController);
    require('./routes/product-routes')(app, controllers.productController);
    require('./routes/image-routes')(app, controllers.imagesController);
    require('./routes/profile-routes')(app, controllers.profileController);

    app.get('*', (req, res) => {
        res.status(404).render('404');
    });

    return Promise.resolve(app);
};

module.exports = { init };
