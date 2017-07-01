/* global __dirname, process */

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const path = require('path');
const fs = require('fs');

const app = express();
const config = require('./app/config');

// fix userData TODO;
const userData = require('./app/data');

console.log('----------');
console.log(config);
console.log(userData);

config(app, userData);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

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


app.get('/', (req, res) => res.render('home'));
app.get('/home', (req, res) => {
    console.log('-------- User -------');
    console.log(req.user);

    return res.render('home');
});

app.get('/bouquets', (req, res) => res.render('bouquets'));
app.get('/baskets', (req, res) => res.render('baskets'));
app.get('/pots', (req, res) => res.render('pots'));
app.get('/cards', (req, res) => res.render('cards'));

app.get('/cart', (req, res) => res.render('cart'));
app.get('/payment', (req, res) => res.render('payment'));
app.get('/delivery', (req, res) => res.render('delivery'));
app.get('/contacts', (req, res) => res.render('contacts'));
app.get('/product-info/:id', (req, res) => res.render('product-info'));

app.get('/profile', (req, res) => res.render('profile'));
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
   // failureFlash: true,
}));

app.get('/logout', (req, res) => res.redirect('home')); // redirect to home

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
