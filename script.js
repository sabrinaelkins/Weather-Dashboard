var apiKey = "af182758c9239d5a0f1cab5a0418329b"
var url1 = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
var Storage = JSON.parse(localStorage.getItem("weatherAPI")) || []
$("#Search").on("click", function () {
    var cityname = $("#cityname").val()
    console.log(cityname)
    currentForecast(cityname)
    $("#cityname").val("")
})
function currentForecast(cityname) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=imperial`,
        success: function (apiData) {
            console.log(apiData)
            $("#currentForecast").html(`
    <h2>${cityname}</h2>
    <h3>Temp:${apiData.main.temp}<span><img src="http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png" /></span></h3>
    <h4>Humidity:${apiData.main.humidity}</h4>
    <h5>Wind Speed:${apiData.wind.speed}</h5>
    <h6>Description:${apiData.weather[0].description}</h6>
    `)
            var lat = apiData.coord.lat
            var long = apiData.coord.lon
            dayForecast(lat, long)
            if(Storage.indexOf(cityname) == -1){
                Storage.push(cityname)
                localStorage.setItem("weatherAPI",JSON.stringify(Storage))
                displayCitySearch()
            }
        }
    })
}
displayCitySearch()

function displayCitySearch(){
    var Storage = JSON.parse(localStorage.getItem("weatherAPI")) || []
    var cityHTML = ""
    $("#SearchForTheCity").html("<h1 class='bg-warning m-2 p-2'>Previous Search</h1>")
    for (let i = 0 ; i < Storage.length;i++)    {
        cityHTML += `<p><button class="previous btn btn-primary">${Storage[i]}</button></p>`
    }
    
    $("#SearchForTheCity").append(cityHTML)
}


$("#SearchForTheCity").on("click",".previous",function(){
    var city = $(this).text()
    currentForecast(city)
})
function dayForecast(lat, lon) {
    $.ajax({

        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`,
        success: function (apiData) {
            console.log(apiData)
            var daily = apiData.daily
            var htmlcode = ""
            for (let i = 1; i < daily.length; i++) {
                htmlcode += `<div class ="card" style="width:33%">
            <h3>Temp:${daily[i].temp.day}<span><img src="http://openweathermap.org/img/wn/${daily[i].weather[0].icon}@2x.png" /></span></h3>
            <h4>Humidity:${daily[i].humidity}</h4>
            <h5>Wind Speed:${daily[i].wind_speed}</h5>
            <h6>Description:${daily[i].weather[0].description}</h6>
            <h6>UVI: ${daily[i].uvi}</h6>
            </div>
            `
                $("#5-dayForecast").html(htmlcode)
            }

            // $("#currentForecast").html(`
            // <h2>${cityname}</h2>
            // <h3>Temp:${apiData.main.temp}<span><img src="http://openweathermap.org/img/wn/${apiData.weather[0].icon}@2x.png" /></span></h3>
            // <h4>Humidity:${apiData.main.humidity}</h4>
            // <h5>Wind Speed:${apiData.wind.speed}</h5>
            // <h6>Description:${apiData.weather[0].description}</h5>
            // `)
        }
    })
}