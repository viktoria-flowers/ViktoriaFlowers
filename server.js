const express = require('express');
const bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json());

// public static folder
app.use(express.static(__dirname + '/public'));

// Port and environment
let env = process.env.NODE_ENV || 'development';
let port = 3000;

// Set view engine
app.set('view engine', 'pug');
app.set('views', __dirname + '/server/views');

 // Routes
app.get('/', function (req, res) {
	res.render('home');
});

app.get('/Home', function (req, res) {
	res.render('home');
});

// route for test GET
const allFlowers = [{name: 'rose', id: 5}];
app.get('/flowers', function (req, res) {
	res.render('flowers', allFlowers);
});

// route for test POST
	// postman POST 
	// header- content-type : application/JSON
		// body - raw 
			// {
			// 	"id": 1,
			// 	"name": "rose"
			// }
app.post('/flowers', function (req, res) {
	// flowers.push(req.body);

	res.end();
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));