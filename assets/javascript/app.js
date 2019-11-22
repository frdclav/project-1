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

let netflix_results_arr = []

function listOfRandomIndexes(length_of_array, length_of_result_array) {
    var resultArr = [];
    while (resultArr.length !== length_of_result_array) {
        var randomNumber = Math.floor(Math.random() * length_of_array);
        if (!resultArr.includes(randomNumber)) {
            resultArr.push(randomNumber)
        }
    }
    return resultArr
}

function getRandomNetflixResults(term, genre_id, vType, number_of_results) {
    // add "Loading Netflix Results..." to page
    $(".movie-options").text("Loading Netflix Suggestions...")

    //  first get the count of result pages
    const first_query = new unogsQuery(term, genre_id, vType, '1');
    const first_url = first_query.generateUrl();
    const first_settings = {
        "async": true,
        "crossDomain": true,
        "url": first_url,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "unogs-unogs-v1.p.rapidapi.com",
            "x-rapidapi-key": unogs_api_key
        }
    };

    $.ajax(first_settings).done(function(response) {
        const count_of_pages = response.COUNT
        console.log(term, genre_id, vType, 'has this many counts:', count_of_pages)

        //  then we want an array of random counts
        const random_result_indexes = listOfRandomIndexes(count_of_pages, number_of_results)

        // now we want a list of random netflix results
        console.log('starting to generate list of actual results', random_result_indexes)

        // create a helper function to run the actual search
        function getNetflixResult(term, genre_id, vType, index_array, index_counter) {

            const page = index_array[index_counter - 1] / 100
            const query = new unogsQuery(term, genre_id, vType, page.toString());
            // console.log(query)
            const url = query.generateUrl();
            // console.log(url)
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
                    console.log(response)
                    let res = response.ITEMS;
                    console.log(res)
                    const randomInd = Math.floor(Math.random() * res.length)
                    netflix_results_arr.push(res[randomInd])
                    const newIndexCounter = index_counter - 1
                    if (newIndexCounter > 0) {
                        getNetflixResult(term, genre_id, vType, index_array, newIndexCounter)
                    } else {
                        // add movies to page
                        $(".movie-options").empty()
                        netflix_results_arr.forEach(element => {
                            addNetflixResult(element)
                        });
                    }
                }


            )
        }
        getNetflixResult(term, genre_id, vType, random_result_indexes, random_result_indexes.length)




    });


}





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


            //this lists the five cocktails of the type of alcohol. Loops 5 times
            for (let i = 0; i < 5; i++) {
                console.log('here')
                $('#drinkNames').append("<li data-drinkid='"+ res.drinks[i].idDrink + "'><a class='waves-effect waves-light btn-large center-align #039be5 light-blue darken-1'>" + res.drinks[i].strDrink +"</a></li>");
            }
            
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
                        ;

                       

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
    
    var apiURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
    $('ul').empty('li')

    // console.log("click")

    $.ajax({
        url: apiURL,
        //this is what will happen when a user request is a success
        success: function(res) {
            console.log('non alchoholic results:',res);



            // randomize 5 non-alchoholic drinks and grab the length of the results
            var randomArray = []; //empty container used for random number of drink index
            var numberOfLoops = 5; //how many times to loop. Also number of drinks to list

            for (let i = 0; i < numberOfLoops; i++) {// loop 5 times

                //get random number for the length of the drinks listed in the res.drinks
                var randomNumber = Math.round(Math.random() * (res.drinks.length - 1));
                
                // checks if the randomNumber variable exists in the randomArray. 
                // indexOf(randomNumber) checks if that randomNumber exists inside of the randomArray. 
                // If it doesn't, the value will be -1, meaning this will be true
                if(randomArray.indexOf(randomNumber) == -1){ 

                    randomArray.push(randomNumber); //push means it'll add randomNumber to randomArray 

                    //this just adds that "randomNumber" index to the list-item (li) in the HTML
                    $('#drinkNames').append("<li data-drinkid='" + res.drinks[randomNumber].idDrink + "'><a class='waves-effect waves-light btn-small center-align #039be5 light-blue darken-1'>" + res.drinks[randomNumber].strDrink + "</a></li>");
                }else {
                    // else if the randomNumber already exists inside of the randomArray, we increment the numberOfLoops by 1, so that we can do another loop
                    numberOfLoops++;
                    console.log('try loop again');
                }
                
            }

            


            

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
        newDiv.addClass('mood center-align');
        newTitle.addClass('waves-effect waves-light btn-large center-align #039be5 light-blue darken-1');
        newTitle.text(element[1]);
        newDiv.attr('data-genre-id', element[0]);
        newDiv.attr('style','font-family: Oswald,sans-serif');
        newDiv.append(newTitle);
        $(".empty-container").append(newDiv);
    });
}

showMoods();

function showFirePlaceMood() {
    const newDiv = $("<div>");
    const newTitle = $("<a>");
    newDiv.addClass('mood fireplace center-align row m2');
    newTitle.addClass('waves-effect waves-light btn-large center-align #039be5 light-blue darken-1');
    newTitle.text('I just need some heat...');
    newDiv.attr('data-genre-id', 'fireplace');
    newDiv.attr('style','font-family: Oswald,sans-serif');
    

    newDiv.append(newTitle);
    $(".empty-container").append(newDiv);
}
showFirePlaceMood()
    // helper function for decoding netflix strings:
function htmlDecode(input) {
    var e = document.createElement('textarea');
    e.innerHTML = input;
    // handle case of empty input
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

// function for adding movie div to #movie-options
function addNetflixResult(nf_obj) {
    const newDiv = $("<div>")
    const newTitle = $("<h3>")
    const newImage = $("<img>")
    const newDescription = $("<p>")
    newDiv.addClass('row container center-align m2')
    newDiv.attr('style', 'margin-left: auto !important;margin-right: auto !important')
    newTitle.text(htmlDecode(nf_obj.title))
    newImage.attr('src', nf_obj.image)
    newImage.addClass('left')
    newDescription.text(htmlDecode(nf_obj.synopsis))
    newDiv.append(newTitle, newImage, newDescription)
    $(".movie-options").append(newDiv)
}

// mood listener
$(document.body).on('click', '.mood', function() {
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count === 0) {
        $(".alcohol").hide();
        $(".alc-search").hide();
    }
    mood = $(this).attr('data-genre-id');
    console.log('youve clicked', mood)
    if (mood === 'fireplace') {
        var fireplaceObj = {
            title: "Fireplace 4K: Crackling Birchwood from Fireplace for Your Home",
            synopsis: "For the first time in 4K Ultra-HD, everyone&#39;s favorite Yuletide fireplace snaps and crackles in crystal clear, high-def holiday warmth.",
            image: "https://occ-0-768-769.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABfyHawrcjvx4x1Rluqx-rlxnoM0imYIoixFYycaEqBpRxgFep2YrRWDpjzVnGBxG77z3_y8nz7jsAkl2TRmHzCNLjWtQ.jpg?r=c6d"
        };
        addNetflixResult(fireplaceObj)
    } else {
        getRandomNetflixResults('', mood, 'Any', 3)

    }

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
    } else {
        $("#drink-selection").hide();
        $("#choices").show();
    }




    //pick random alcoholic drinks for choices div via api with alcoholType var
});


// ================ END UI ========================