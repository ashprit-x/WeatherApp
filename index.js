

let weather = {
    apiKey: "",//your api key here
    lat : " ",
    long : " ",
    fetchCoords: async function(cityName) {

        let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${this.apiKey}`);
        if(!response.ok){
            throw new Error('Error');
        }
        const data = await response.json(); 
        console.log(data);
        this.getLongAndLat(data);
    },
    getLongAndLat : function(data) {
        const { lat, lon } = data[0];
        this.fetchWeather(lat, lon);
    },
    fetchWeather : async function(lat, lon) {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather.apiKey}`);
        if(!response.ok){
            throw new Error('Error');
        }
        const data = await response.json();
        console.log(data);
        this.displayWeather(data);
    },
    displayWeather: function (data)  {
        const{ name } = data;
        const{ icon, description} = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerHTML = `Weather in ${name}`;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temp").innerHTML = Math.floor(temp-273.15) + "°C";
        document.querySelector(".humidity").innerHTML =
        "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerHTML =
        "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";

        console.log(name,icon,description,temp,humidity,speed);
    },
    search: function () {
        this.fetchCoords(document.querySelector(".search-bar").value);
      },
}

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchCoords("Denver");