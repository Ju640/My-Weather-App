function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
let currentTime = new Date();
let timeElement = document.querySelector("#time");
timeElement.innerHTML = formatTime(currentTime);

function formatDate(date) {
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

  let todaysDay = dates[date.getDate()];
  let month = months[date.getMonth()];
  return `Today - ${month} ${todaysDay}`;
}
let todaysDate = document.querySelector("#date");
todaysDate.innerHTML = formatDate(currentTime);

function showTemperature(response) {
  document.querySelector("#citySearched").innerHTML = response.data.name;
  document.querySelector("#tempToday").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#today-specifications").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
}

function searchCity(city) {
  let apiKey = "edd56f6e907ca8d1ecae9dbda915cab0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearchInput").value;
  searchCity(city);
}

function currentLocationWeather(response) {
  console.log(response);
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

function retrievePosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(currentLocationWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentPosition);

let form = document.querySelector("#searchbar");
form.addEventListener("submit", search);

searchCity("Paris");
