function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
let currentTime = new Date();
let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatTime(currentTime);

function formatDate(timestamp) {
  let currentDate = new Date(timestamp);
  let dates = [
    "0",
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
    "17th",
    "18th",
    "19th",
    "20th",
    "21st",
    "22nd",
    "23rd",
    "24th",
    "25th",
    "26th",
    "27th",
    "28th",
    "29th",
    "30th",
    "31st",
  ];

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
    "December",
  ];

  let todaysDay = dates[currentDate.getDate()];
  let month = months[currentDate.getMonth()];
  return `Today - ${month} ${todaysDay}`;
}

function showTemperature(response) {
  document.querySelector("#citySearched").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#tempToday").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#today-specifications").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#date").innerHTML = formatDate(
    response.data.dt * 1000
  );
  let iconElement = document.querySelector("#mainIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2 forecastCol">
      <div class="forecastTime">
        ${formatTime(forecast.dt * 1000)}
      </div>
      <div class="000"><img class="forecastImage"
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      /></div>
      <div class="forcastList">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function searchCity(city) {
  let apiKey = "edd56f6e907ca8d1ecae9dbda915cab0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearchInput").value;
  searchCity(city);
}

function currentLocationWeather(response) {
  let currentTemperature = document.querySelector("#tempToday");
  let currentCity = document.querySelector("#citySearched");
  let temperature = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let todaySpecification = response.data.weather[0].description;
  let humidity = response.data.main.humidity;
  let wind = response.data.wind.speed;
  let todaySpecificationsElement = document.querySelector(
    "#today-specifications"
  );
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  currentCity.innerHTML = `${cityName}`;
  currentTemperature.innerHTML = `${temperature}`;
  todaySpecificationsElement.innerHTML = `${todaySpecification}`;
  humidityElement.innerHTML = `${humidity}`;
  windElement.innerHTML = `${wind}`;
}

function displayFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#tempToday").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function displayCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#tempToday");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displayCelsius);

let form = document.querySelector("#searchbar");
form.addEventListener("submit", search);

searchCity("Paris");
