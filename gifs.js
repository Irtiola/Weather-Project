var popCities = ['San Francisco', 'Los Angeles', 'New York', 'Moscow', 'Toronto']
// function that adding buttons with popular cities
function renderButtons() {
    $('#popCity').empty();
    for (i = 0; i < popCities.length; i++) {
        createButtons(popCities[i]);
    }
}
renderButtons();

//function that creates new buttons with class="cName" and appending new buttons to existing ones
function createButtons(cName) {
    var b = $('<button>');
    b.attr('class', 'cName btn btn-info')
    b.text(cName);
    $("#popCity").append(b);
    $("#popCity").append(" ");
};
//function that adding new button with new city
$("#citySubmit").on("click", function (event) {
    var newCity = $("#cityChoice").val();
    console.log(newCity);
    createButtons(newCity);
    popCities.push(newCity);
    event.preventDefault();
    $("#cityChoice").val("");
});

// Random Gif chooser
var gifNumber
function randomGifNumber() {
    var rand = Math.floor(Math.random() * 10);
    gifNumber = rand;
}
/// This is where out GIF API JS is //////////////////////////////////////
var apiKey = '?api_key=UPVjVwevOqPChTS9FFJ6lm8GhpmtVLPm';
var gifSearch = ["so hot", "ahhh", "brrrr"];
var apiURL;
var qGif = "Testing";

function gifPush() {
    gifSearch;
    apiURL = `https://api.giphy.com/v1/gifs/search${apiKey}&q=${qGif}&limit=10&lang=en`;
    $.ajax({
        url: apiURL,
        method: 'GET'
    }).then(function (response) {
        console.log(response);
        $('#gifBox').html('');
        randomGifNumber()
        for (var i = 0; i < 1; i++) {
            //<a> tag was added to toubleshoot a later step
            var gifDiv = $('<span>');
            var img = $('<img>');
            gifDiv.attr('class', 'loadedGIF');
            gifDiv.append(img);
            gifDiv.append(`<br><br>`)
            img.attr('class', i)
            img.attr('class', 'shadow-lg rounded')
            img.attr('src', response.data[gifNumber].images.fixed_width.url);
            $('#gifBox').append(gifDiv).prepend("<br>");
        }
    })
}
gifPush()
/// This is where out weather API JS is //////////////////////////////////////
// This is our API key
var APIKeyWeather = "166a433c57516f51dfab1f7edaed8413";
var city;
var queryURLWeather;

console.log(queryURLWeather)

// Here we run our AJAX call to the OpenWeatherMap API
$(document).on('click', ".cName", function () {
    city = $(this).text()
    // $('#chosenCity').text(city);
    event.preventDefault();
    console.log(city);
    queryURLWeather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKeyWeather}`;

    $.ajax({
        url: queryURLWeather,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {
            // Log the queryURLWeather
            console.log(queryURLWeather);

            // Log the resulting object
            console.log(response);
            console.log(response.main.temp)

            // Transfer content to HTML
            $(".city").html("<h1><span class='citySpan'></span> Weather Details</h1>");
            $(".wind").html("<p>Wind Speed: <span class='windSpan'></span></p> ");
            $(".humidity").html("<p>Humidity: <span class='humSpan'></span></p>");
            $(".temp").html("<p>Temperature (F): <span class='tempSpan'></span></p>");

            //Fill in weather info
            cityTemp = response.main.temp; //Temp
            cityHum = response.main.humidity; //Humidity
            cityWind = response.wind.speed; //Wind Speed
            cityName = response.name

            weatherDBPush()

            // Log the data in the console as well
            console.log("Wind Speed: " + response.wind.speed);
            console.log("Humidity: " + response.main.humidity);
            console.log("Temperature (F): " + response.main.temp);
            // debugger;
            if (cityTemp > "85") {
                qGif = gifSearch[0];
                gifPush();
            } else if (cityTemp <= "85" && cityTemp > "60") {
                qGif = gifSearch[1];
                gifPush();
            } else if (cityTemp <= "60") {
                qGif = gifSearch[2];
                gifPush();
            }
        });
})

// Firebase Code///////////////////////////////////////////////
var config = {
    apiKey: "AIzaSyBxj0TEF8tSw7qvhgICM8wr7briVblXdlM",
    authDomain: "geoffs-db-1.firebaseapp.com",
    databaseURL: "https://geoffs-db-1.firebaseio.com",
    projectId: "geoffs-db-1",
    storageBucket: "geoffs-db-1.appspot.com",
    messagingSenderId: "700166027767",
    appId: "1:700166027767:web:2ae2df8992d3db12"
};

firebase.initializeApp(config);

const db = firebase.database();

var cityWind;
var cityTemp;
var cityHum;
var cityName;

function weatherDBPush() {
    db.ref().push({
        Temp: cityTemp,
        Humidity: cityHum,
        WindSpeed: cityWind,
        City: cityName,
        Time: firebase.database.ServerValue.TIMESTAMP
    });
}

db.ref().on("value", function (snapshot) {
    var data = snapshot.val();

    for (var key in data) {
        var value = data[key];
        $('.citySpan').text(cityName)
        $('.windSpan').text(value.WindSpeed);
        $('.humSpan').text(value.Humidity);
        $('.tempSpan').text(value.Temp);
    }
});

//mobile dropdown
$( ".navbar-toggler").on("click", function(){

    $("#navbarNav").toggleClass('collapse')
    });
 