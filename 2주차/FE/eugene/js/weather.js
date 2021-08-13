const API_KEY = "9f60d5d5c53816a1455abbcef193fa8e";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    //console.log("You live it", lat, lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metrid`;
    //console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => {
        //console.log(data.name, data.weather[0].main);
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        //const name = data.name;
        //const weather = data.weather[0].main;
        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main}`;
    });
}
function onGeoError(){
    alert("Cant find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);
