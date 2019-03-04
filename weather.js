// Author: Chaya Malik
var APIkey = "49d120d850378d2f007ba95ae5572cbc";
var units = "imperial";
var url = 'https://api.openweathermap.org/data/2.5/weather?';
var result = "hi"; 
var data; 
var hourdata; 
var loc = "New York";
var searchType = "q";

var days = {
    0 : "Sunday",
    1 : "Monday",
    2 : "Tuesday",
    3 : "Wednesday",
    4 : "Thursday", 
    5 : "Friday",
    6 : "Saturday"
}

var iconsSmall = {
    "Thunderstorm": "https://media.giphy.com/media/eei6N9FK98dbQqN7g8/giphy.gif",
    "Drizzle" : "https://media.giphy.com/media/26BRAojlUnm9hXC9y/giphy.gif",
    "Rain" : "https://media.giphy.com/media/7YCgL9K4HTfUD0TTn5/giphy.gif",
    "Snow": "https://media.giphy.com/media/h5SbEEFpDs84U/giphy.gif",
    "Atmosphere" : "https://media.giphy.com/media/X7OrJ0XT3r6dWx4131/giphy.gif",
    "Clear" : " https://media.giphy.com/media/fdzUGVIz7C98FEtfqT/giphy.gif",
    "Clouds": "https://media.giphy.com/media/2AMBtjL26O65qciYjR/giphy.gif",
    "Mist" : "https://media.giphy.com/media/12zxWWVMXNDOy4/giphy.gif"
    
}
var icons= {
    "Thunderstorm": "https://media.giphy.com/media/QLgsqoJRoKqYdkDGnW/giphy.gif",
    "Drizzle" : "https://media.giphy.com/media/26BRAojlUnm9hXC9y/giphy.gif",
    "Rain" : "https://media.giphy.com/media/3ohhwiPdqOcRQVJHH2/giphy.gif",
    "Snow": "https://media.giphy.com/media/h5SbEEFpDs84U/giphy.gif",
    "Atmosphere" : "https://media.giphy.com/media/X7OrJ0XT3r6dWx4131/giphy.gif",
    "Clear" : " https://media.giphy.com/media/fdzUGVIz7C98FEtfqT/giphy.gif",
    "Clouds": "https://media.giphy.com/media/2AMBtjL26O65qciYjR/giphy.gif",
    "Mist" : "https://media.giphy.com/media/12zxWWVMXNDOy4/giphy.gif"

}

function start(locate, search){
    settimeday();
    console.log("start. next up: first");
    loc = locate; 
    searchType = search;
    
    var query = url + searchType + "=" + loc + "&APPID=" + APIkey +"&units=" + units;
    first(next);
}

function first(callback){
    console.log("first. next up: quer");
    quer('https://api.openweathermap.org/data/2.5/weather?', setHTML, next);
}
function next(){
    console.log("next. next up: quer");
    quer( 'https://api.openweathermap.org/data/2.5/forecast?', hourly);
}

function get(){
     console.log("inget");

    var l = document.getElementById("input").value; 
    var s= document.querySelector('input[name="searchType1"]:checked').value;
    start(l, s);
}
function quer(urlin, callback){
    console.log("quesr. next up:weatherresults ");
    //alert("urlin: " + urlin);
    var query = urlin + searchType + "=" + loc + "&APPID=" + APIkey +"&units=" + units;
    console.log(query);
    fetch(query).then(result => {
        return result.json();
    }).then(result => {
        data = result;
        weatherResults(callback); 
    });
}

function weatherResults(callback){
    
    if(data.cod == 404){
        alert("City not found. Please try again.");
        return; 
    }
    console.log("weatherresults. next up: "  + callback );
    data = data; 
    console.log(data); 
    callback(); 
}
function setHTML(){
     console.log("setHTML. nextup: next");
    document.getElementById("loc").innerHTML = loc; 
    document.getElementById("temp").innerHTML =Math.floor(data.main.temp)  + "°F"; 
    document.getElementById("description").innerHTML = data.weather[0].main;
    if(data.weather[0].main == "Clouds"){
        var inner = '<span class ="smm" >' + data.weather[0].description + '</span>'
        document.getElementById("description").innerHTML =inner; 
    } 
    if(data.weather[0].main == "Atmosphere"){
        document.getElementById("description").innerHTML = data.weather[0].description; 
    } 
    document.getElementById("pe").innerHTML = data.clouds.all + "%";
    document.getElementById("humid").innerHTML = data.main.humidity + "%"; 
    document.getElementById("wind").innerHTML = data.wind.speed + " mph";
    document.getElementById("imgicon").src = icons[data.weather[0].main];
    //if description not in dict, use generice weather gif
     if(Object.values(icons).indexOf(icons[data.weather[0].main]) == -1){
        document.getElementById("imgicon").src = "https://media.giphy.com/media/k7y7J6GzdBji9VNUS5/giphy.gif"
     }
    next();
}

function settimeday(){
    console.log("settimeday");
    var d = new Date();
    var n = d.getDay();
    var i; 
    for (i= 1; i < 5; i++) {
        var id = "daylabel" + i; 
        document.getElementById(id).innerHTML = days[++n];
    }
}


function hourly(){
    console.log("HOURLY");
    console.log("HOURLY DATA" + data); 
    //set hourly divs 
    for (i= 0; i < 6; i++) {
        document.getElementById("hourtemp" + i).innerHTML =Math.floor(data.list[i].main.temp) + "°F";
        var describe = data.list[i].weather[0].main
        document.getElementById("hourdesc" + i).innerHTML = describe;
        if(describe == "Clouds"){
            var inner = '<span class ="smm1" >' + data.list[i].weather[0].description + '</span>'
            document.getElementById("hourdesc" + i).innerHTML  =inner; 
        } 
        if(describe == "Atmosphere"){
            var inner = '<span class ="smm1" >' + data.list[i].weather[0].description + '</span>'
            document.getElementById("hourdesc" + i).innerHTML  =inner;  
        } 
        document.getElementById("hourimg" + i).src = iconsSmall[data.list[i].weather[0].main];
        document.getElementById("hourlabel" + i).innerHTML =hourResults(data.list[i].dt); 
    }

    // DAILY
    var ind = [0, 8, 16, 24, 32]; //indexes for new days in list of results returned 
    for (i= 0; i < 5; i++) {
        document.getElementById("lowdaily" + i).innerHTML =Math.floor(data.list[ind[i]].main.temp_min) + "°F";
        document.getElementById("hidaily" + i).innerHTML =Math.floor(data.list[ind[i]].main.temp_max) + "°F";
        //if clouds or atmosphere, get more details. 
        var describe = data.list[ind[i]].weather[0].main; 
        document.getElementById("desdaily" + i).innerHTML = describe;
        if(describe == "Clouds"){
            var inner = '<span class ="smm1" >' + data.list[ind[i]].weather[0].description + '</span>'
            document.getElementById("desdaily" + i).innerHTML  =inner; 
        } 
        if(describe == "Atmosphere"){
            var inner = '<span class ="smm1" >' + data.list[ind[i]].weather[0].description + '</span>'
            document.getElementById("desdaily" + i).innerHTML  =inner;  
        } 
        document.getElementById("imgdaily" + i).src = iconsSmall[describe];
    }

}

function hourResults(tunix){
   //convert from unix to EST readable format
    var time = new Date(tunix*1000);
    var minutes = time.getMinutes(); 
    var hours = time.getHours();
    if(minutes <10){
        minutes = '0' +  time.getMinutes()
    }
    if(hours <10){
       hours = '0' +  time.getHours();
    }
    finalTime = hours + ":" + minutes;
    return tConvert(finalTime); 
}


    //source: https://stackoverflow.com/questions/13898423javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
    function tConvert (time) {
        // Check correct time format and split into components
        time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join (''); // return adjusted time or original string
    }
