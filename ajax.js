$(document).ready(function() {
   
 $("#productSearch").val('test  value');
    //=== product search
    $("#productSearch").keyup(function() {
        alert( "Handler for .keyup() called." );

        var searchQuery = $("#productSearch").val();
        //  $.get("/products/" + searchQuery, function(results) {
        //     $("#productSearchResults").hide();

        // });
        $.get("/products/" + searchQuery, function(results) {
            $("#productSearchResults").html(results);
            alert('aes4edrfcf')
            //async: true
            //console.log(searchQuery);
            //console.log(results)
        });
    });//=====category search
    $("#categorySearch").keyup(function() {
        var searchQuery = $("#categorySearch").val();
        $.get("/categories/" + searchQuery, function(results) {
            $("#categorySearchResults").html(results);
            console.log(results)
        });
    });

    //=====supplier search
    $("#supplierSearch").keyup(function() {
        var searchQuery = $("#supplierSearch").val();
        $.get("/suppliers/" + searchQuery, function(results) {
            $("#supplierSearchResults").html(results);
            console.log(results)
        });
    });

    //=====sales search
    $("#salesSearch").keyup(function() {
        var searchQuery = $("#salesSearch").val();
        $.get("/sales/" + searchQuery, function(results) {
            $("#salesSearchResults").html(results);
            console.log(results)
        });
    });

    //=====purchase search
    $("#purchaseSearch").keyup(function() {
        var searchQuery = $("#purchaseSearch").val();
        $.get("/purchases/" + searchQuery, function(results) {
            $("#purchaseSearchResults").html(results);
            console.log(results)
        });
    });



    //=====user search
       $("#userSearch").keyup(function() {
        var searchQuery = $("#userSearch").val();
        $.get("/users/" + searchQuery, function(results) {
            //$("#salesSearchResults").html(results);
            console.log("ajax",results);
            if(results === searchQuery){
                $("#sinupButton").hide()
            }else if(results !== searchQuery){
               $("#sinupButton").show() 
            }

            console.log(results)
        });
    });

});
//searchQuery = $('productSearch').val(),