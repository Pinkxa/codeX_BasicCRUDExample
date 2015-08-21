var bcrypt = require('bcrypt');
/***
 * A very basic CRUD example using MySQL
 */	
exports.userCheck = function  (req, res, next) {
	if(req.session.user){
		next();
	}
	else{
		res.redirect("/");
	}
};
//todo - fix the error handling

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
        var Admin = req.session.role === "admin";
        var view = req.session.role !== "admin";
		connection.query('SELECT * from users', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'users', {
    			users : results,
                in_ca: Admin,
                action: view
    		});
      });
	});
};

var addUser = function(req, cb){

    req.getConnection(function(err, connection) {
        if (err) {
            return next(err);
        }

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            Username: input.username,
            Password: input.password,
            Role: input.role || 'view'
        };

        //bcrypt the password===
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(input.password, salt, function(err, hash) {
                // Store hash in your password DB. 
                data.Password = hash;
                connection.query('insert into users set ?', data, cb);
            });
        });
    });
};

exports.register = function(req, res, next) {

    var registerCallback = function(err, results) {
        if (err)
            console.log("Error inserting : %s ", err);
        res.redirect('/?status=user_created');
    };

    addUser(req, registerCallback);
};

exports.add = function(req, res, next) {
    
    var addCallback = function(err, results) {
        if (err)
            console.log("Error inserting : %s ", err);

        res.redirect('/users');
    };

    addUser(req, addCallback);
};

exports.get = function(req, res, next){
        var Id = req.params.User_role;
        req.getConnection(function(err, connection){
            connection.query('SELECT * FROM Users WHERE Role = ?', [Id], function(err,rows){
                if(err){
                        console.log("Error Selecting : %s ",err );
                }
                res.render('EditUser',{page_title:"Edit Customers - Node.js", data : rows[3]});   

            }); 
        });
    };

//updating a user
exports.admin = function(req, res, next) {

        var data = JSON.parse(JSON.stringify(req.body));
        var id = req.params.Id;
        req.getConnection(function(err, connection) {
            connection.query('UPDATE Users SET Role = "admin" WHERE ID = ?', id, function(err, rows) {
                if (err) {
                    console.log("Error Updating : %s ", err);
                }
                res.redirect('/users');
            });

        });
    };
exports.notAdmin = function(req, res, next) {

        var data = JSON.parse(JSON.stringify(req.body));
        var id = req.params.Id;
        req.getConnection(function(err, connection) {
            connection.query('UPDATE Users SET Role = "view" WHERE ID = ?', id, function(err, rows) {
                if (err) {
                    console.log("Error Updating : %s ", err);
                }
                res.redirect('/users');
            });

        });
    };

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    	var id = req.params.id;
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE users SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/users');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM users WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/users');
		});
	});
};
exports.login = function(req, res, next) {
        var input = JSON.parse(JSON.stringify(req.body));
       var username = input.username;
        req.getConnection(function(err, connection) {
            if (err)
                return next(err)

            connection.query('SELECT * from users WHERE Username=?', [username], function(err, users) {

            var user = users[0];

                bcrypt.compare(input.password, user.Password, function(err, pass) {

            console.log(user);

                    if (err) {
                        console.log(err);
                    }

                    if (pass) {
                        req.session.user = username;
                        req.session.role = user.Role;
                        return res.render("index")
                    } else {
                        return res.redirect('/');
                    }
                })
            })
        })
    };
