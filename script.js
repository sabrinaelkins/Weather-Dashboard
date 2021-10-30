var apiKey= "af182758c9239d5a0f1cab5a0418329b"
var url1 =  "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
$("#Search").on("click",function() {
var cityname = $("#cityname").val()
console.log(cityname)
})