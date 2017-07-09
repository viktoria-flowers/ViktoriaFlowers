const express = require('express');

const app = express();

const data = require('./data');




require('./config/app.config')(app);
require('./config/auth.config')(app, data);

require('./routes/server-routes')(app);
require('./routes/auth.routes')(app);
// require('./routes/api.routes')(app);

app.get('*', (req, res) => {
    res.render('404');
});

module.exports = app;
