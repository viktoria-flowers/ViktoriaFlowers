/* global __dirname */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

// public static folder
app.use(express.static(__dirname + '/public'));

// Port and environment
let env = process.env.NODE_ENV || 'development';
let port = 3000;

// Set view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/server/views');
app.locals.basedir = path.join(__dirname, '/server/views');
// app.locals.pretty = true; // uncomment this and pug will return unminified HTML response

// Routes
app.get('/', function(req, res) {
    res.render('index');
});

app.get('/shop', (req, res) => res.render('shop'));
app.get('/cart', (req, res) => res.render('cart'));
app.get('/product', (req, res) => res.render('product'));
app.get('/text-page', (req, res) => res.render('text-page'));

app.get('/Home', function(req, res) {
    res.render('index');
});

// route for test GET
const allFlowers = [{ name: 'rose', id: 5 }];
app.get('/flowers', function(req, res) {
    res.render('flowers', { allFlowers: allFlowers });
});

// route for test POST
// postman POST 
// header- content-type : application/JSON
// body - raw 
// {
// 	"id": 1,
// 	"name": "rose"
// }
app.post('/flowers', function(req, res) {

    // flowers.push(req.body);
    console.log(req.body);
    res.statusCode = '201';
    res.statusMessage = 'Test';
    res.json({ message: 'Ok' });
    res.end();
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));