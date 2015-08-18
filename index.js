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

app.get('/register', function (req, res,next){
  res.render('register',{layout:false});
});

// Setting up main route
app.get('/', function (req, res) {
  // Default route returns index.jade
  res.render('login',{layout: false});
});

app.post('/login', users.login); 

app.use(function(req, res, next){
  console.log('in my middleware!');
  //proceed to the next middleware component
  next();
});

app.get('/logout', function (req, res) {
  delete req.session.user;
  res.redirect('/')
});

app.get('/home', function (req, res) {
  res.render('index')
})

var userCheck = function(req, res, next){
  if (req.session.user){
    return next();
  }
  // the user is not logged in redirect him to the login page
  else{
  res.redirect('/');
   }
};

/*app.get('/users', checkUser, function(req, res){
  var userData = userService.getUserData();
  res.render('users', userData)
});
*/
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

//setup the handlers
app.get('/users', users.show);
//app.get('/users/edit/:id', users.get);
app.post('/users/update/:id', users.update);
app.post('/users/register', users.register);
app.post('/users/add', users.add);
//app.post('/users/login', users.login);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/users/delete/:id', users.delete);

//start everything up
app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});