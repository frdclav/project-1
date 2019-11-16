// ================ START unogs api stuff ======================

function unogsQuery(searchTerm, startYear, endYear, startNetflixRating, endNetflixRating, startImdbRating, endImdbRating, genreId, vType, audioType, subtitleLanguage, imdb_votes, country, page) {
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
    this.country = country //setting this to something static TODO: get country_id for US
    this.page = page

    // method to return query url
    this.generateUrl = function () {
        const first_part_of_url = 'https://unogs-unogs-v1.p.rapidapi.com/aaapi.cgi?q='
        const delim = '=!'
        const end = '&t=ns&cl=all&st=adv&ob=Relevance&sa=and&p='
        const unenc = first_part_of_url + this.searchTerm + delim + startYear + ',' + endYear + delim + startNetflixRating + ',' + endNetflixRating + delim + startImdbRating + ',' + endImdbRating + delim + genreId + delim + vType + delim + audioType + delim + subtitleLanguage + delim + this.imdb_votes + delim + end + page
        return encodeURI(unenc)
    }

}



























// ================ END unogs api stuff ========================


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
$("#click-me").on("click", function (event) {

    $("#welcome").hide();
    $("#of-age").show();

});

$("#yes").on("click", function (event) {
    count++
    $("#of-age").hide();
    $("#movie-selection").show();
});


$("#no").on("click", function (event) {
    $("#of-age").hide();
    $("#movie-selection").show();
})

$(".mood-one").on("click", function (event) {
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count === 0) {
        $(".alcohol").hide();
        $(".hide").hide();
    }

    //mood=whatever the mood is 
});

$(".mood-two").on("click", function (event) {
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count === 0) {
        $(".alcohol").hide();
        $(".hide").hide();
    }
    //mood=whatever the mood is
});

$(".mood-three").on("click", function (event) {
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count === 0) {
        $(".alcohol").hide();
        $(".hide").hide();
    }
    //mood=whatever the mood is
});

$(".mood-four").on("click", function (event) {
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count === 0) {
        $(".alcohol").hide();
        $(".hide").hide();
    }
    //mood=whatever the mood is
});

$(".mood-five").on("click", function (event) {
    $("#movie-selection").hide();
    $("#drink-selection").show();
    if (count === 0) {
        $(".alcohol").hide();
        $(".hide").hide();
    }
    //mood=whatever the mood is
});

//turns user input into value for api search later
var alcoholType;

$(".no-alcohol").on("click", function (event) {
    $("#drink-selection").hide();
    $("#choices").show();
    //pick random non-alcoholic drinks for choices div via api
});

$(".hide").on("click", function (event) {

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


