
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

        connection.query('SELECT * from categories where catname LIKE ?', searchQuery, function(err, results) {
            if (err)
                return next(err);
            
            console.log("***********")
            console.log(results)

            res.render('category', {
                categories: results,
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
		connection.query('SELECT id, catname from categories', [], function(err, results) {
        	if (err) return next(err);

    		res.render( 'categories', {
    			categories : results,
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
            		catname : input.catname
        	};

        	console.log("***********************");
        	console.log(data);

		connection.query('insert into categories set ?', data, function(err, results) {
        		if (err)
              			console.log("Error inserting : %s ",err );
         
          		res.redirect('/categories');
      		});
	});
};

exports.get = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('SELECT * FROM categories WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.render('EditCat',{page_title:"Edit Customers - Node.js", data : rows[0]});      
		}); 
	});
};

exports.update = function(req, res, next){

	var data = JSON.parse(JSON.stringify(req.body));
    	var id = req.params.id;
    	req.getConnection(function(err, connection){
    		connection.query('UPDATE categories SET ? WHERE id = ?', [data, id], function(err, rows){
    			if (err){
              			console.log("Error Updating : %s ",err );
    			}
          		res.redirect('/categories');
    		});
    		
    });
};

exports.delete = function(req, res, next){
	var id = req.params.id;
	req.getConnection(function(err, connection){
		connection.query('DELETE FROM categories WHERE id = ?', [id], function(err,rows){
			if(err){
    				console.log("Error Selecting : %s ",err );
			}
			res.redirect('/categories');
		});
	});
};

