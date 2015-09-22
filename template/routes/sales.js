exports.search = function(req, res, next) {
    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        var searchQuery = req.params.searchQuery;
        searchQuery = "%" + searchQuery + "%";
        console.log(searchQuery);
        connection.query('SELECT * from sales where id LIKE ?', searchQuery, function(err, results) {
                if (err)
                    return next(err);
                var Admin = false;
                if (req.session.role == "Admin")
                    Admin = true
                res.render('sales', {
                    sales: results,
                    products : results1,
                    in_ca: Admin
                });
            });
    });
};

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT name, id from products', [], function(err, results1) {
		connection.query("SELECT DATE_FORMAT(sales.date,'%d %b %y') as date, sales.product_id as id, products.name as name, sales.quantity as quantity, sales.price as price from sales, products WHERE products.id = sales.product_id group by name", [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'sales', {
    			sales : results,
    			products : results1
    		});
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
            		product_id : input.product_id,
            		date : input.date,
            		quantity : input.quantity,
            		price : input.price

        	};

        console.log("***********************");
        console.log(data);

		connection.query('insert into sales set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/sales');
      		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM sales WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('EditSales',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;
    var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            		product_id : input.product_id,
            		date : input.date,
            		quantity : input.quantity,
            		price : input.price

        	};
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE sales SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/sales');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM sales WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/sales');
		});
	});
};

