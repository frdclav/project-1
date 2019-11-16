//using to distinguish between legal drinkers and underages users
var count=0;

//setting mood with click event later
var mood;

//to hide divs when page is first accessed
function hideMe(){
    $("#of-age").hide();
    $("#movie-selection").hide();
    $("#drink-selection").hide();
    $("#choices").hide();
}

hideMe();

// goes to 21+ question after get started is clicked
$("#click-me").on("click", function(event){

    $("#welcome").hide();
    $("#of-age").show();
    
});

$("#yes").on("click", function(event){
    count++
    $("#of-age").hide();
    $("#movie-selection").show();
});


$("#no").on("click", function(event){
    $("#of-age").hide();
    $("#movie-selection").show();
})

$(".mood-one").on("click", function(event){
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count===0){
        $(".alcohol").hide();
        $(".hide").hide();
    }
    
    //mood=whatever the mood is 
});

$(".mood-two").on("click", function(event){
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count===0){
        $(".alcohol").hide();
        $(".hide").hide();
    }
    //mood=whatever the mood is
});

$(".mood-three").on("click", function(event){
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count===0){
        $(".alcohol").hide();
        $(".hide").hide();
    }
    //mood=whatever the mood is
});

$(".mood-four").on("click", function(event){
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count===0){
        $(".alcohol").hide();
        $(".hide").hide();
    }
    //mood=whatever the mood is
});

$(".mood-five").on("click", function(event){
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count===0){
        $(".alcohol").hide();
        $(".hide").hide();
    }
    //mood=whatever the mood is
});

//turns user input into value for api search later
var alcoholType;

$(".no-alcohol").on("click", function(event){
    $("#drink-selection").hide();
    $("#choices").show();
    //pick random non-alcoholic drinks for choices div via api
});

$(".hide").on("click", function(event){

    event.preventDefault();

    alcoholType=$(".alcohol").val().trim();
    console.log(alcoholType);

    //checking to see if user entered something in form
    if(!alcoholType){
        Swal.fire('Please Enter an Alcohol Type')
    }


    $("#drink-selection").hide();
    $("#choices").show();
    
    //pick random alcoholic drinks for choices div via api with alcoholType var
});




