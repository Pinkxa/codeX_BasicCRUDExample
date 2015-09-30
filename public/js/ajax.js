$(document).ready(function() {

    //=== product search
    $("#productSearch").keyup(function() {

        var searchQuery = $("#productSearch").val();
        $.get("/products/search/" + searchQuery, function(results) {
            $("#productSearchResults").html(results);
        });
    });

    //=====category search
    $("#categorySearch").keyup(function() {
        var searchQuery = $("#categorySearch").val();
        $.get("/categories/search/" + searchQuery, function(results) {
            $("#categorySearchResults").html(results);
        });
    });

    //=====supplier search
    $("#supplierSearch").keyup(function() {
        var searchQuery = $("#supplierSearch").val();
        $.get("/suppliers/search/" + searchQuery, function(results) {
            $("#supplierSearchResults").html(results);
        });
    });

    //=====sales search
    $("#saleSearch").keyup(function() {
        var searchQuery = $("#saleSearch").val();
        $.get("/sales/search/" + searchQuery, function(results) {
            $("#saleSearchResults").html(results);
        });
    });

    //=====purchase search
    $("#purchaseSearch").keyup(function() {
        var searchQuery = $("#purchaseSearch").val();
        $.get("/purchases/search/" + searchQuery, function(results) {
            $("#purchaseSearchResults").html(results);
        });
    });



    //=====user search
       $("#userSearch").keyup(function() {
        var searchQuery = $("#userSearch").val();
        $.get("/users/search/" + searchQuery, function(results) {
            $("userSearchResults").html(results);
        });
    });

});
//searchQuery = $('productSearch').val(),