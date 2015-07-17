'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    products = require('./routes/products');
var categories = require('./routes/categories');
var sales = require('./routes/sales');
var purchases = require('./routes/purchases');
var suppliers = require('./routes/suppliers');

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'linokuhlekamva',
      port: 3306,
      database: 'Nelisa'
};

//setup template handlebars as the template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

//setup middleware
app.use(myConnection(mysql, dbOptions, 'single'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//setup the handlers
app.get('/products', products.show);
app.get('/products/edit/:id', products.get);
app.post('/products/update/:id', products.update);
app.post('/products/add', products.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:id', products.delete);

//setup the handlers
app.get('/categories', categories.show);
app.get('/categories/edit/:id', categories.get);
app.post('/categories/update/:id', categories.update);
app.post('/categories/add', categories.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/categories/delete/:id', categories.delete);

//setup the handlers
app.get('/sales', sales.show);
app.get('/sales/edit/:id', sales.get);
app.post('/sales/update/:id', sales.update);
app.post('/sales/add', sales.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/sales/delete/:id', sales.delete);

//setup the handlers
app.get('/purchases', purchases.show);
app.get('/purchases/edit/:id', purchases.get);
app.post('/purchases/update/:id', purchases.update);
app.post('/purchases/add', purchases.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/purchases/delete/:id', purchases.delete);

//setup the handlers
app.get('/suppliers', suppliers.show);
app.get('/suppliers/edit/:id', suppliers.get);
app.post('/suppliers/update/:id', suppliers.update);
app.post('/suppliers/add', suppliers.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/suppliers/delete/:id', suppliers.delete);


//start everything up
app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});
