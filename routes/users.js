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
		connection.query('SELECT * from users', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'users', {
    			users : results
    		});
      });
	});
};

exports.add = function(req, res, next) {
        req.getConnection(function(err, connection) {
            if (err) {
                return next(err);
            }

            var input = JSON.parse(JSON.stringify(req.body));
            var data = {
                Username: input.username,
                Password: input.password,
                Role: 'normalUser' || 'adminUser'

            };

            //bcrypt the password===
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(input.password, salt, function(err, hash) {
                    // Store hash in your password DB. 
                    data.Password = hash;
                    connection.query('insert into users set ?', data, function(err, results) {
                        if (err)
                            console.log("Error inserting : %s ", err);

                        res.redirect('/?status=user_created');

                    });
                });
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

                        return res.redirect("/home")
                    } else {
                        return res.redirect('/');
                    }
                })
            })
        })
    };
