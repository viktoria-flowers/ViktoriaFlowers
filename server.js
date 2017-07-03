/* global __dirname, process */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const path = require('path');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));


// Morgan part
const logsFile = fs.createWriteStream(
    path.join(__dirname, 'logs.log'),
    { flags: 'a' });

const logStream = {
    stream: logsFile,
};

const logger = morgan(
    'combined',
    logStream);

app.use(logger);

// public static folder
app.use('/static', express.static(__dirname + '/public'));
app.use('/libs', express.static(__dirname + '/node_modules'));

// Port and environment
// const env = process.env.NODE_ENV || 'development';
const port = 3000;

// Set view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/server/views');
app.locals.basedir = path.join(__dirname, '/server/views');

// uncomment this and pug will return unminified HTML response
// app.locals.pretty = true; 

require('./routes/server-routes')(app);
// require('./routes/api.routes')(app);

app.get('*', (req, res) => {
    res.render('404');
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
