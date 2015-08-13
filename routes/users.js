
/***
 * A very basic CRUD example using MySQL
 */	

//todo - fix the error handling

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT id, Username, Password, Role from users', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'users', {
    			users : results
    		});
      });
	});
};

exports.add = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err){ 
			return next(err);
		}
		
		var input = JSON.parse(JSON.stringify(req.body));

		console.log("***********************");
        console.log(input);

		var data = {
            		Username : input.Username
        	};

        	console.log("***********************");
        	console.log(data);

		connection.query('insert into users set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/users');
      		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM users WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('EditUsers',{page_title:"Edit Customers - Node.js", data : rows[0]});      
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

