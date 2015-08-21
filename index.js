'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    mysql = require('mysql'), 
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    Products = require('./routes/products');
var categories = require('./routes/categories');
var sales = require('./routes/sales');
var purchases = require('./routes/purchases');
var suppliers = require('./routes/suppliers');
var session = require('express-session');
var users = require('./routes/users');
var cookieParser = require('cookie-parser');

var app = express();

var dbOptions = {
      host: 'localhost',
      user: 'root',
      password: 'linokuhlekamva',
      port: 3306,
      database: 'Nelisa'
};

app.use(express.static(__dirname + '/public'));

app.use(myConnection(mysql, dbOptions, 'single'));
app.use(cookieParser('shhhh, very secret'));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 3600000 }, resave: true, saveUninitialized: true})); -
app.use(express.static('public'));
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//setup the handlers
app.get('/products', users.userCheck, Products.show);
app.get('/products/edit/:id', users.userCheck, Products.get);
app.post('/products/update/:id', users.userCheck, Products.update);
app.post('/products/add', users.userCheck, Products.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:id', users.userCheck, Products.delete);

//setup the handlers
app.get('/categories', users.userCheck, categories.show);
app.get('/categories/edit/:id', users.userCheck, categories.get);
app.post('/categories/update/:id', users.userCheck, categories.update);
app.post('/categories/add', users.userCheck, categories.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/categories/delete/:id', users.userCheck, categories.delete);

//setup the handlers
app.get('/sales', users.userCheck, sales.show);
app.get('/sales/edit/:id', users.userCheck, sales.get);
app.post('/sales/update/:id', users.userCheck, sales.update);
app.post('/sales/add', users.userCheck, sales.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/sales/delete/:id', users.userCheck, sales.delete);

//setup the handlers
app.get('/purchases', users.userCheck, purchases.show);
app.get('/purchases/edit/:id', users.userCheck, purchases.get);
app.post('/purchases/update/:id', users.userCheck, purchases.update);
app.post('/purchases/add', users.userCheck, purchases.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/purchases/delete/:id', users.userCheck, purchases.delete);

//setup the handlers
app.get('/suppliers', users.userCheck, suppliers.show);
app.get('/suppliers/edit/:id', users.userCheck, suppliers.get);
app.post('/suppliers/update/:id', users.userCheck, suppliers.update);
app.post('/suppliers/add', users.userCheck, suppliers.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/suppliers/delete/:id', users.userCheck, suppliers.delete);

//setup the handlers
app.get('/users', users.userCheck, users.show);
//app.get('/users/edit/:id', users.get);
app.post('/users/update/:id', users.userCheck, users.update);
app.post('/users/add', users.userCheck, users.add);
//app.post('/users/login', users.login);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/users/delete/:id', users.userCheck, users.delete);

app.get('/register', function (req, res,next){
  res.render('register',{layout:false});
});

app.post('/register', users.register);

// Setting up main route
app.get('/', function (req, res) {
  // Default route returns index.jade
  res.render('login',{layout: false});
});

app.post('/login', users.login); 

app.use(users.userCheck);

app.get('/home', function (req, res, next) {
  res.render('index')
})

app.get('/logout', function (req, res) {
  delete req.session.user;
  res.redirect('/')
});

//start everything up
app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});