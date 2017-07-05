/* global __dirname, process */

const configApp = (application) => {
    const express = require('express');
    const bodyParser = require('body-parser');
    const morgan = require('morgan');

    const path = require('path');
    const fs = require('fs');

    application.use(bodyParser.json());
    application.use(bodyParser.urlencoded({
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

    application.use(logger);

    // public static folder
    application.use('/static', express.static(__dirname + '/../../public'));
    application.use('/libs', express.static(__dirname + '/../../node_modules'));

    // Port and environment
    // const env = process.env.NODE_ENV || 'development';

    // Set view engine
    application.set('view engine', 'pug');
    application.set('views', __dirname + '/../../server/views');
    application.locals.basedir = path.join(__dirname, '/../../server/views');

    // uncomment this and pug will return unminified HTML response
    // app.locals.pretty = true;
};

module.exports = configApp;
