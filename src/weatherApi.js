import { response } from '../src/app';
var dateFormat = require("dateformat");

export let fetchLocation = (zipcode) => {
  fetch(`https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=${zipcode}`)
    .then(response => response.json())
    .then(data => fetchWeather(data));
}

export let fetchWeather = (data) => {
  let date = new Date();
  let formatedDate = dateFormat(date, "dddd mmmm dS, yyyy")
  let newd = new Date()

  let newDate= (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();

  let weatherData = {
    city: data.city,
    state: data.regionCode,
    lat: data.latitude,
    long: data.longitude,
    date: formatedDate,
  }
  fetch(`https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${weatherData.lat}&${weatherData.long}=-104.2&date=${newDate}`)
    .then(response => response.json())
    .then(res => weatherData.info = res)
    .then(() => response(weatherData))
}

