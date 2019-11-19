// ================ START unogs api stuff ======================

function unogsQuery(searchTerm, genreId, vType, page) {
    this.searchTerm = searchTerm
    this.startYear = "1900" //setting the start year to something static
    this.endYear = "2021" // setting the end year to something static
    this.startNetflixRating = '0' //setting this to something static
    this.endNetflixRating = '5' //setting this to something static
    this.startImdbRating = '0' //setting this to something static
    this.endImdbRating = '10' //setting this to something static
    this.genreId = genreId
    this.vType = vType
    this.audioType = 'English' //setting this to something static
    this.subtitleLanguage = 'English' //setting this to something static
    this.imdb_votes = 'gt[0]' //setting this to something static
    this.country = '78' //setting this to something static TODO: get country_id for US
    this.page = page

    // method to return query url
    this.generateUrl = function() {
        const first_part_of_url = 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q='
        const delim = '-!'
        const end = '&t=ns&cl=all&st=adv&ob=Relevance&sa=and&p='
        const unenc = first_part_of_url + this.searchTerm + delim + this.startYear + ',' + this.endYear + delim + this.startNetflixRating + ',' + this.endNetflixRating + delim + this.startImdbRating + ',' + this.endImdbRating + delim + this.genreId + delim + this.vType + delim + this.audioType + delim + this.subtitleLanguage + delim + this.imdb_votes + delim + end + this.page
        return encodeURI(unenc)
    }

}



//  function to pass in unogsQuery object and get back a list/array of 5 result objects

function unogsGetResults(term, genre_id, vType) {
    const query = new unogsQuery(term, genre_id, vType, '1');
    const url = query.generateUrl();
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
            "x-rapidapi-key": unogs_api_key
        }
    };

    $.ajax(settings).done(function(response) {
            console.log(response);
            let resArr = [];
            for (let index = 0; index < 5; index++) {
                const element = response.ITEMS[index];
                console.log('item', index, element)
                resArr.push(element)
            }
            resArr.forEach(element => {
                addNetflixResult(element)
            })
        }

    )
};

// console.log(unogsGetResults('', '6548', 'Any'))

// getting the genre_ids

// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://unogs-unogs-v1.p.rapidapi.com/api.cgi?t=genres",
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
//         "x-rapidapi-key": "a928869491msh3c89ebc5d6b92d6p14d54ejsn41f57ef05b75"
//     }
// }

// $.ajax(settings).done(function (response) {
//     let resArr = response.ITEMS
//         ;
//     resArr.forEach(element => {
//         const keyy = Object.keys(element)
//         const ids = element[keyy]
//         console.log(keyy, element[keyy])

//     });
// });



// Moods: 
// funny, romantic, dramatic, informative, exciting, thrilling, supenseful, action-packed

const funny = ['6548', 'Funny']
const romantic = ['8883', 'Romantic']
const dramatic = ['5763', 'Dramatic']
const informative = ['6839', 'Informative']
const exciting = ['1365', 'Exciting']
const thrilling = ['8933', 'Thrilling']

const scary = ['8711', 'Scary']
const animated = ['7424', 'Animated']

const listOfCategories = [funny, romantic, dramatic, informative, exciting, thrilling, scary, animated]








// ================ END unogs api stuff ========================



// ================ start cocktail api stuff ========================
function callAPI() {
    var ingredient = $("#ingredientItem").val();
    console.log(ingredient);
    var apiURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + ingredient + "";
    $('ul').empty('li')

    // console.log("click")

    $.ajax({
        url: apiURL,
        //this is what will happen when a user request is a success
        success: function(res) {
            console.log(res);

            //this capitalizes the first letter and puts the name of alcohol on page
            $("#drinkType").html(ingredient.substr(0, 1).toUpperCase() + ingredient.substr(1));

           
            //this lists the five cocktails of the type of alcohol
            $('#drinkNames').append("<li data-drinkid='" + res.drinks[0].idDrink + "'>" + res.drinks[0].strDrink + "</li>");
            $('#drinkNames').append("<li data-drinkid='" + res.drinks[1].idDrink + "'>" + res.drinks[1].strDrink + "</li>");
            $('#drinkNames').append("<li data-drinkid='" + res.drinks[2].idDrink + "'>" + res.drinks[2].strDrink + "</li>");
            $('#drinkNames').append("<li data-drinkid='" + res.drinks[3].idDrink + "'>" + res.drinks[3].strDrink + "</li>");
            $('#drinkNames').append("<li data-drinkid='" + res.drinks[4].idDrink + "'>" + res.drinks[4].strDrink + "</li>");


            $('li').on('click', function() {
                var drinkId = $(this).data('drinkid');
                // console.log(drinkId);

                var ingredientsApiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId + "";

                $.ajax({
                    url: ingredientsApiUrl,
                    //this is what will happen when a user request is a success
                    success: function(res) {
                        console.log(res);

                        $('.drinkName').html(res.drinks[0].strDrink);
                        $('.drinkimage').attr('src', res.drinks[0].strDrinkThumb);

                        $('.drinkIngredients').empty();

                        // for (let i = 1; i <= 1; i++) {
                        //     console.log('strIngredient'+[i]);
                        //     var ingredientString = 'strIngredient'+[i];

                        //     function getProp(object, value) { 
                        //         console.log('object:', object);
                        //         console.log('value:', value);
                        //         return object.value;
                        //     }

                        //     var ans = getProp(res.drinks[0], ingredientString); 

                        //     console.log(ans); 

                        // }

                        if (res.drinks[0].strIngredient1 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient1 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure1 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient2 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient2 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure2 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient3 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient3 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure3 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient4 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient4 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure4 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient5 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient5 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure5 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient6 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient6 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure6 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient7 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient7 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure7 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient8 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient8 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure8 + "</span></li>");
                        }








                        $('.drinkInstructions').html(res.drinks[0].strInstructions);


                    },
                    error: function(invalid) {
                        console.log(invalid)
                    }
                });
            });


        },
        error: function(invalid) {
            console.log(invalid)
        }
    });
}


$('.alc-search').on('click', function() {
    // console.log('alc-search')
    callAPI();
});


// ====non alc
function callAPINonAlc() {
    // var ingredient = $("#ingredientItem").val();
    // console.log(ingredient);
    var apiURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic" ;
    $('ul').empty('li')

    // console.log("click")

    $.ajax({
        url: apiURL,
        //this is what will happen when a user request is a success
        success: function(res) {
            console.log(res);

            //this capitalizes the first letter and puts the name of alcohol on page
            // $("#drinkType").html(ingredient.substr(0, 1).toUpperCase() + ingredient.substr(1));

           
            //this lists the five cocktails of the type of alcohol
            $('#drinkNames').append("<li data-drinkid='" + res.drinks[0].idDrink + "'>" + res.drinks[0].strDrink + "</li>");
            $('#drinkNames').append("<li data-drinkid='" + res.drinks[1].idDrink + "'>" + res.drinks[1].strDrink + "</li>");
            $('#drinkNames').append("<li data-drinkid='" + res.drinks[2].idDrink + "'>" + res.drinks[2].strDrink + "</li>");
            $('#drinkNames').append("<li data-drinkid='" + res.drinks[3].idDrink + "'>" + res.drinks[3].strDrink + "</li>");
            $('#drinkNames').append("<li data-drinkid='" + res.drinks[4].idDrink + "'>" + res.drinks[4].strDrink + "</li>");


            $('li').on('click', function() {
                var drinkId = $(this).data('drinkid');
                // console.log(drinkId);

                var ingredientsApiUrl = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + drinkId + "";

                $.ajax({
                    url: ingredientsApiUrl,
                    //this is what will happen when a user request is a success
                    success: function(res) {
                        console.log(res);

                        $('.drinkName').html(res.drinks[0].strDrink);
                        $('.drinkimage').attr('src', res.drinks[0].strDrinkThumb);

                        $('.drinkIngredients').empty();

                        // for (let i = 1; i <= 1; i++) {
                        //     console.log('strIngredient'+[i]);
                        //     var ingredientString = 'strIngredient'+[i];

                        //     function getProp(object, value) { 
                        //         console.log('object:', object);
                        //         console.log('value:', value);
                        //         return object.value;
                        //     }

                        //     var ans = getProp(res.drinks[0], ingredientString); 

                        //     console.log(ans); 

                        // }

                        if (res.drinks[0].strIngredient1 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient1 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure1 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient2 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient2 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure2 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient3 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient3 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure3 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient4 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient4 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure4 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient5 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient5 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure5 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient6 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient6 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure6 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient7 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient7 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure7 + "</span></li>");
                        }

                        if (res.drinks[0].strIngredient8 != null) {
                            $('.drinkIngredients').append("<li><span class='strIngredient'>" + res.drinks[0].strIngredient8 + "</span> - <span class='strMeasure'>" + res.drinks[0].strMeasure8 + "</span></li>");
                        }








                        $('.drinkInstructions').html(res.drinks[0].strInstructions);


                    },
                    error: function(invalid) {
                        console.log(invalid)
                    }
                });
            });


        },
        error: function(invalid) {
            console.log(invalid)
        }
    });
}


$('.no-alcohol').on('click', function() {
    // console.log('alc-search')
    callAPINonAlc();
});


// ================ END cocktail api stuff ========================

// ================ START UI ======================




//using to distinguish between legal drinkers and underages users
var count = 0;

//setting mood with click event later
var mood;

//to hide divs when page is first accessed
function hideMe() {
    $("#of-age").hide();
    $("#movie-selection").hide();
    $("#drink-selection").hide();
    $("#choices").hide();
}

hideMe();

// goes to 21+ question after get started is clicked
$("#click-me").on("click", function(event) {

    $("#welcome").hide();
    $("#of-age").show();

});

$("#yes").on("click", function(event) {
    count++
    $("#of-age").hide();
    $("#movie-selection").show();
});


$("#no").on("click", function(event) {
    $("#of-age").hide();
    $("#movie-selection").show();
})



// function for generating moods based on listOfCategories
function showMoods() {
    listOfCategories.forEach(element => {
        const newDiv = $("<div>");
        const newTitle = $("<a>");
        newDiv.addClass('mood center-align row m2');
        newTitle.addClass('waves-effect waves-light btn center-align');
        newTitle.text(element[1]);
        newDiv.attr('data-genre-id', element[0]);
        // newDiv.attr('style', 'border:1px solid;width:200px');

        newDiv.append(newTitle);
        $("#movie-selection").append(newDiv);
    });
}

showMoods();


// function for adding movie div to #movie-options
function addNetflixResult(nf_obj) {
    const newDiv = $("<div>")
    const newTitle = $("<h3>")
    const newImage = $("<img>")
    const newDescription = $("<p>")
    newDiv.addClass('row container center-align m2')
    newDiv.attr('style', 'margin-left: auto !important;margin-right: auto !important')
    newTitle.text(nf_obj.title)
    newImage.attr('src', nf_obj.image)
    newImage.addClass('left')
    newDescription.text(nf_obj.synopsis)
    newDiv.append(newTitle, newImage, newDescription)
    $(".movie-options").append(newDiv)
}
// mood listener
$(document.body).on('click', '.mood', function() {
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count === 0) {
        $(".alcohol").hide();
        $(".alc-search'").hide();
    }
    mood = $(this).attr('data-genre-id');
    console.log('youve clicked', mood)
    unogsGetResults('', mood, 'Any')

});

//turns user input into value for api search later
var alcoholType;

$(".no-alcohol").on("click", function(event) {
    $("#drink-selection").hide();
    $("#choices").show();
    //pick random non-alcoholic drinks for choices div via api
});

$(".alc-search").on("click", function(event) {

    event.preventDefault();

    alcoholType = $(".alcohol").val().trim();
    console.log(alcoholType);

    //checking to see if user entered something in form
    if (!alcoholType) {
        Swal.fire('Please Enter an Alcohol Type')
    }


    $("#drink-selection").hide();
    $("#choices").show();

    //pick random alcoholic drinks for choices div via api with alcoholType var
});


// ================ END UI ========================