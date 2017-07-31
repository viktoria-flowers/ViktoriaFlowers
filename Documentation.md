# Project

E-commerce Node.js application for selling flowers.

## Getting Started

This application is based on the following technologies:

- Node.js
- Mongo DB
- JavaScript
- JQuery

## Libraries used in the application

- "body-parser": "^1.17.2",
- "bootstrap": "^3.3.7",
- "cookie-parser": "^1.4.3",
- "express": "^4.15.3",
- "express-session": "^1.15.3",
- "jquery": "^3.2.1",
- "jquery-zoom": "^1.7.20",
- "moment": "^2.18.1",
- "mongodb": "^2.2.30",
- "morgan": "^1.8.2",
- "multer": "^1.3.0",
- "nodemon": "^1.11.0",
- "passport": "^0.3.2",
- "passport-local": "^1.0.0",
- "pug": "^2.0.0-rc.2",
- "toastr": "^2.1.2",
- "typeahead": "^0.2.2"
- "babel-eslint": "^7.2.3",
- "chai": "^4.1.0",
- "eslint": "^4.1.1",
- "eslint-config-google": "^0.8.0",
- "gulp": "^3.9.1",
- "gulp-istanbul": "^1.1.2",
- "gulp-mocha": "3",
- "istanbul": "^0.4.5",
- "mocha": "^3.4.2",
- "selenium-webdriver": "^3.4.0",
- "sinon": "^2.3.8",
- "supertest": "^3.0.0"

### Prerequisites

Before using the app you have to run the following command in the folder of the application:

`npm install`

### Main functionalities

The user can:

- login
- register
- search for products
- arrange/sort product lists
- edit his own profile
- add products to cart
- finish his order
- see his order history
- add products to his favorites
- subscribe by e-mail for the newest offers
- send his advise, opinion or contact by contact form

The admin can:

- add new products
- delete existing products
- set user as admin

*Only logged in users can add to cart and finish their orders

### Routes

`Public`

* /login
* /register
* /products/cards
* /products/pots
* /products/baskets
* /products/circle
* /products/tall
* /products/wedding
* /products/extraordinary
* /delivery
* /payment
* /payOnDelivery
* /card-payment
* /paypal-payment

`Private`

* /profile
* /profile-edit
* /products/create
* /products/delete
* /userslist
* /checkout

## Images

<p float="left">
  <img src="./public/images/app-screenshots/autocomplete.png" width="400" />
  <img src="./public/images/app-screenshots/offers.png" width="400" /> 
  <img src="./public/images/app-screenshots/product-details.png" width="400" />
  <img src="./public/images/app-screenshots/profile.png" width="400" />
  <img src="./public/images/app-screenshots/mobile-front.png" width="400" />
  <img src="./public/images/app-screenshots/mobile-contacts.png" width="400" />  
</p>

## Deployment

The application is uploaded on AWS cloud with his Mongo DB.
It can be found in: 
<p>`http://ec2-13-59-39-204.us-east-2.compute.amazonaws.com`</p>

## Authors

* **Marian Nikolov**
* **Mihail Yankov**
* **Martina Shebova**

## License

This project is licensed under the MIT License