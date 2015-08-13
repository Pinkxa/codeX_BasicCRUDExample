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
app.use(session({ secret: 'keyboard cat',  resave: false,
  saveUninitialized: true,cookie: { maxAge: 60000 }}));

app.get('/register', function (req, res,next){
  res.render('register', {layout: false});
});

// Setting up main route
app.get('/', function (req, res) {
  // Default route returns index.jade
  res.render('login',{layout: false});
});

app.post('/login', function (req, res) {
  var input = JSON.parse(JSON.stringify(req.body));
   var data = {
                username : input.username,
                Password : input.password,
                Role : "normalUser"
          };
    req.getConnection(function(err, connection){
    if (err) 
      return err;
    connection.query('SELECT * from users where Username = ?', [data], function(err, results) {
          if (err) return err;
    console.log(Username)
         if(data.username == Username){
  res.render('/users',{
  username:Username,
  password:Password,
  Role:Role

  });
}
  else{
    res.redirect("/");
  }
      });
  });
   
 //var user = users;

});

//setup middleware
/*app.use(function(req, res, next){
  console.log('in my middleware...');
  //proceed to the next middleware component
  //next();
  console.log(req.path);

  if (req.session.user || req.path === "/login"){
    return next();
  }
  // the user is not logged in redirect him to the login page
  res.redirect('/login');

});*/

app.get('/logout', function (req, res) {
  // Default route returns index.jade
  //res.render('Pretty');
  delete req.session.user;
  res.redirect('/')
});

app.use(users.userCheck);

// Setting up main route
app.get('/home', function (req, res) {
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

//setup the handlers
app.get('/users', users.show);
app.get('/users/edit/:id', users.get);
app.post('/users/update/:id', users.update);
app.post('/users/add', users.add);
//this should be a post but this is only an illustration of CRUD - not on good practices
app.get('/users/delete/:id', users.delete);

//start everything up
app.listen(3000, function () {
    console.log('express-handlebars example server listening on: 3000');
});