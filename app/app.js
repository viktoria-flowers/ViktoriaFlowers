const express = require('express');

const init = (data) => {
    const app = express();

    const controllers = require('./controllers/init').init(data);

    // folder app/config
    require('./config/app-config')(app);
    require('./config/auth-config')(app, data.users);

    // folder app/routes
    require('./routes/server-routes')(app, controllers.usersController);
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
