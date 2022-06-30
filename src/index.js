let now = new Date();
console.log(now.getDate());

let currentDate = document.querySelector("#current-date");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

currentDate.innerHTML = `${day}, ${hours}:${minutes}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

function stopClick(event) {
  event.preventDefault();
}

function showTemperature(response) {
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  console.log(response);
  let message = `${temp}`;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = message;
}

function showWeather(response) {
  let changedh1 = document.querySelector("h1");
  changedh1.innerHTML = `${response.data.name}`;
  let currentTemperature = Math.round(response.data.main.temp);
  let currentDegrees = `${currentTemperature}`;
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = currentDegrees;
}

function retrievePosition(position) {
  let apiKey = "de2c40e370d58e257faf07ba4ea95840";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", getCurrentPosition);
