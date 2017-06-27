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
app.use(express.static(__dirname + '/node_modules'));


// Port and environment
let env = process.env.NODE_ENV || 'development';
let port = 3000;

if (true) {

}
else {

}

// Set view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/server/views');
app.locals.basedir = path.join(__dirname, '/server/views');
// app.locals.pretty = true; // uncomment this and pug will return unminified HTML response

// Routes
// app.get('/', function(req, res) {
//     res.render('home');
// });

app.get('/', (req, res) => res.render('home'));
app.get('/home', (req, res) => res.render('home'));

app.get('/bouquets', (req, res) => res.render('bouquets'));
app.get('/baskets', (req, res) => res.render('baskets'));
app.get('/pots', (req, res) => res.render('pots'));
app.get('/cards', (req, res) => res.render('cards'));

app.get('/cart', (req, res) => res.render('cart'));
app.get('/delivery', (req, res) => res.render('delivery'));
app.get('/payment', (req, res) => res.render('payment'));
app.get('/contacts', (req, res) => res.render('contacts'));
app.get('/product-info/:id', (req, res) => res.render('product-info'));

app.get('/profile', (req, res) => res.render('profile')); 
app.get('/register', (req, res) => res.render('register'));
app.get('/login', (req, res) => res.render('login'));

app.get('/logout', (req, res) => res.redirect('home')); // redirect to home



// route for test GET
// const allFlowers = [{ name: 'rose', id: 5 }];
// app.get('/flowers', function(req, res) {
//     res.render('flowers', { allFlowers: allFlowers });
// });

// route for test POST
// postman POST 
// header- content-type : application/JSON
// body - raw 
// {
// 	"id": 1,
// 	"name": "rose"
// }

// app.post('/flowers', function(req, res) {

//     // flowers.push(req.body);
//     console.log(req.body);
//     res.statusCode = '201';
//     res.statusMessage = 'Test';
//     res.json({ message: 'Ok' });
//     res.end();
// });

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));