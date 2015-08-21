
/***
 * A very basic CRUD example using MySQL
 */	

//todo - fix the error handling

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
        	//var products = results	
        connection.query('SELECT products.id AS id, products.name AS name, categories.catname AS catname FROM products, categories WHERE products.category_id = categories.id', [], function(err, results){
            if (err) return next(err);
            var Admin = req.session.role === "admin"
            var user = req.session.role !== "admin"
            console.log(req.session);
            console.log(Admin);
        connection.query('SELECT * from categories', [], function(err, results1) {
            if (err) return next(err);
              //console.log(results1);
    		       res.render( 'home', {
    			      products : results,
    			      categories : results1,
                in_ca : Admin,
                action : user
    		       });
        	})
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
            		name : input.name,
            		category_id : input.category_id
        	};

    console.log("***********************");
    console.log(data);

		connection.query('insert into products set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/products');
      		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM products WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('edit',{page_title:"Edit Customers - Node.js", data : rows[0]});      
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
                res.redirect('/products');
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
                res.redirect('/products');
            });

        });
    };

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    var input = JSON.parse(JSON.stringify(req.body));
         var data = {
         	name : input.name
         };
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE products SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/products');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM products WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/products');
		});
	});
};

