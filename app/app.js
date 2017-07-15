const express = require('express');

const app = express();

const connString = 'mongodb://localhost/viktoria-flowers';

require('../db').init(connString).then((db) => {
    const data = require('./data').init(db);

    require('./config/app.config')(app);
    require('./config/auth.config')(app, data.users);

    require('./routes/server-routes')(app);
    require('./routes/auth.routes')(app, data.users);
    require('./routes/api.routes')(app); // Test api routers

    app.get('*', (req, res) => {
        res.render('404');
    });
});

module.exports = app;
