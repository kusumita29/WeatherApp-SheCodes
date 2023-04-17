let date = new Date();

let weekdays =[
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
]

let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

let today1 = document.querySelector(".curr-date")
today1.innerHTML = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;

let today2 = document.querySelector(".curr-time");
let curr_hr = date.getHours();
if (curr_hr < 10){
    curr_hr = "0" + curr_hr
}
today2.innerHTML = `${weekdays[date.getDay()]} ${curr_hr}:${date.getMinutes()}`

function showTemperature(response){
    console.log(response);
    let temp = document.querySelector(".curr-temp")
    temp.innerHTML = Math.round(response.data.main.temp) + "°"
    let range_of_temp = document.querySelector(".range-temp")
    range_of_temp.innerHTML = `${Math.round(response.data.main.temp_min)}°/${Math.round(response.data.main.temp_max)}°`
    description = document.querySelector(".curr-3 .curr-weather")
    description.innerHTML = response.data.weather[0].main
    let city = document.querySelector(".curr-city")
    console.log(city)
    city.innerHTML = response.data.name
    document.getElementById("image").src=`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
    
    
}


function change_city(){
        let prev_city = document.querySelector(".curr-city")
        let curr_entered = document.querySelector(".search-bar-value")
        prev_city.innerHTML = curr_entered.value[0].toUpperCase() + curr_entered.value.substring(1)
        console.log(prev_city.innerHTML)
        let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${prev_city.innerHTML}&units=metric&appid=${apiKey}`
        axios.get(apiURL).then(showTemperature);
        
}

function change_to_curr_city(position){
    console.log(position)
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    console.log(lat)
    console.log(lon)
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    axios.get(apiURL).then(showTemperature);
}

function get_coords(){
    navigator.geolocation.getCurrentPosition(change_to_curr_city)
}

function search_enter(event){
    if (event.keyCode === 13)
        change_city()
}

let city = document.querySelector(".search-bar")
city.addEventListener("keypress", search_enter);

let search_btn = document.querySelector(".search-button")
search_btn.addEventListener("click", change_city);

console.log(city);

let cel_temp = Number(document.querySelector(".curr-temp").innerHTML.slice(0,-1)); 

function changetoFahr(){
    let fahr_temp = (cel_temp * 1.8) + 32
    document.querySelector(".curr-temp").innerHTML = `${fahr_temp}°`;
}

function changetoCelc(){
    document.querySelector(".curr-temp").innerHTML = `${cel_temp}°`;
}

function change_scale(){
    let scale = document.querySelector(".degree-button")
    if (scale.innerHTML === "C")
    {
        scale.innerHTML = "F"
        changetoFahr()
    }
    else{
        scale.innerHTML = "C"
        changetoCelc()
    }     
}

document.querySelector(".degree-button").addEventListener("click", change_scale)

let current_btn = document.querySelector(".current-button")
current_btn.addEventListener("click", get_coords);
