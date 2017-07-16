const express = require('express');

const init = (data) => {
    const app = express();

    // folder app/config
    require('./config/app-config')(app);
    require('./config/auth-config')(app, data.items);

    // folder app/routes
    require('./routes/server-routes')(app);
    require('./routes/auth-routes')(app, data.items);
    require('./routes/api-routes')(app); // Test api routers

    app.get('*', (req, res) => {
        res.render('404');
    });

    return Promise.resolve(app);
};

module.exports = { init };
