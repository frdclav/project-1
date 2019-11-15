
//to hide divs when page is first accessed
function hide(){
    $("#of-age").hide();
    $("#movie-selection").hide();
    $("#drink-selection").hide();
    $("#choices").hide();
}

hide();

// goes to 21+ questioon after get strated is clicked
$("#click-me").on("click", function(event){

    $("#welcome").hide();
    $("#of-age").show();
    
});