const express = require('express');

const app = express();

require('./config/app.config')(app);

require('./routes/server-routes')(app);
// require('./routes/api.routes')(app);

app.get('*', (req, res) => {
    res.render('404');
});

module.exports = app;
