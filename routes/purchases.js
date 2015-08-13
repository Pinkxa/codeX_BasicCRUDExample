
/***
 * A very basic CRUD example using MySQL
 */	

//todo - fix the error handling

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		connection.query('SELECT name, id FROM products', [], function(err, results2) {
        connection.query('SELECT shop, id FROM suppliers', [], function(err, results1) {
		connection.query("SELECT DATE_FORMAT(purchases.date,'%d %b %y') as date, purchases.price as price, purchases.product_id as id, purchases.supplier_id as id, products.name as name, suppliers.shop as shop from purchases, products, suppliers WHERE purchases.product_id = products.id and purchases.supplier_id = suppliers.id group by products.name", [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'purchases', {
    			purchases : results,
    			suppliers : results1,
    			products : results2
    		});
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
            		supplier_id : input.supplier_id,
            		price : input.price

        	};

    console.log("***********************");
    console.log(data);

		connection.query('insert into purchases set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/purchases');
      		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM purchases WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('EditPurch',{page_title:"Edit Customers - Node.js", data : rows[0]});      
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
            		supplier_id : input.supplier_id,
            		price : input.price

        	};
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE purchases SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/purchases');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM purchases WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/purchases');
		});
	});
};

