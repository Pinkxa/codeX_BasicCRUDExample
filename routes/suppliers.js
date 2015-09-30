
/***
 * A very basic CRUD example using MySQL
 */	

//todo - fix the error handling
exports.search = function (req, res, next) {
    req.getConnection(function(err, connection) {
        if (err)
            return next(err);
        var searchQuery = req.params.query;
        searchQuery = "%" + searchQuery + "%";
        console.log(searchQuery);

        var Admin = req.session.role === "admin"
        var user = req.session.role !== "admin"

        connection.query('SELECT * from suppliers where shop LIKE ?', searchQuery, function(err, results) {
            if (err)
                return next(err);
            
            console.log("***********")
            console.log(results)

            res.render('supplier', {
                suppliers: results,
                layout : false,
                in_ca : Admin,
                action : user
        });
    });
});
}

exports.show = function (req, res, next) {
	req.getConnection(function(err, connection){
		if (err) 
			return next(err);
		var Admin = req.session.role === "admin"
            var user = req.session.role !== "admin"
            console.log(req.session);
            console.log(Admin);
		connection.query('SELECT id, shop from suppliers', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'suppliers', {
    			suppliers : results,
    			in_ca : Admin,
    			action : user
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
            		shop : input.shop
        	};

        console.log("***********************");
        console.log(data);

		connection.query('insert into suppliers set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/suppliers');
      		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM suppliers WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('EditSup',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    	var id = req.params.id;
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE suppliers SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/suppliers');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM suppliers WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/suppliers');
		});
	});
};

