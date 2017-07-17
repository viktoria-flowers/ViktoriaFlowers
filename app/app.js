const express = require('express');

const init = (data) => {
    const app = express();

    // folder app/config
    require('./config/app-config')(app);
    require('./config/auth-config')(app, data.users);

    // folder app/routes
    require('./routes/server-routes')(app, data);
    require('./routes/auth-routes')(app, data.users);
    require('./routes/api-routes')(app);
    require('./routes/bouquete-routes')(app, data);
    require('./routes/image-routes')(app, data);

    app.get('*', (req, res) => {
        res.render('404');
    });

    return Promise.resolve(app);
};

module.exports = { init };
