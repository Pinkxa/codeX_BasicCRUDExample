var express = require('express'),
    session = require('express-session'),
    app = express();

app.use(function(req, res, next){
  console.log('in my middleware!');
  //proceed to the next middleware component
  next();
});

var checkUser = function(req, res, next){
  if (req.session.user){
    return next();
  }
  // the user is not logged in redirect him to the login page
  res.redirect('login');
};

app.get('/users', checkUser, function(req, res){
  var userData = userService.getUserData();
  res.render('users', userData)
});