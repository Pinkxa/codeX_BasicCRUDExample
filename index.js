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
//session setup
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))


// Setting up main route
app.get('/', function (req, res) {
  // Default route returns index.jade
  res.render('index')
})

//setup the handlers
app.get('/products', Products.show);
app.get('/products/edit/:id', Products.get);
app.post('/products/update/:id', Products.update);
app.post('/products/add', Products.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/products/delete/:id', Products.delete);

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

app.get('/register', function (req, res){
  res.render('register', {layout: false});
});

// Setting up main route
app.get('/login', function (req, res) {
  // Default route returns index.jade
  res.render('login',{layout: false});
});

app.post('/login', function (req, res) {
  // Default route returns index.jade
  //res.render('Pretty');
  req.session.user = {};
  res.redirect('/categories')
});

//setup middleware
app.use(function(req, res, next){
  console.log('in my middleware...');
  //proceed to the next middleware component
  //next();
  console.log(req.path);

  if (req.session.user || req.path === "/login"){
    return next();
  }
  // the user is not logged in redirect him to the login page
  res.redirect('/login');

});

app.get('/logout', function (req, res) {
  // Default route returns index.jade
  //res.render('Pretty');
  delete req.session.user;
  res.redirect('/login')
});

/*var checkUser = function(req, res, next){
  if (req.session.user){
    return next();
  }
  // the user is not logged in redirect him to the login page
  res.redirect('login');
};*/

//start everything up
app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});