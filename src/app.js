import { convertDate } from "./utils";
import { daysOfWeek } from './days'
import { fetchLocation, fetchWeather} from './weatherApi'


// Manage State
let zipcode;
let currentWeather = {
}

// Query Selectors
let search = document.getElementById("input-btn")
let input = document.getElementById('city-input')
let location = document.getElementById('location')
let date = document.getElementById('date')
let temp = document.getElementById('temp')
let summary = document.getElementById('summary')
// let tomorrow = document.getElementById('tomorrow')
// let twodays = document.getElementById('two-days')
// let tomorrowSum = document.getElementById('weather-sum-tomorrow')
// let weatherSumTwo = document.getElementById('weather-sum-two')
// let tomorrowHL = document.getElementById('high-low-tomorrow')
// let twoHL = document.getElementById('high-low-two')
let img = document.getElementById('weather-img')

// Controller - Get Weather Data / Update State
export let response = (weatherInfo) => {
  currentWeather = weatherInfo
  console.log(currentWeather)
  updateDOM()
}

let logInput = (e) => {
  let search = e.target.value
  zipcode = search
}

let getWeather = async (e) => {
  e.preventDefault()
  fetchLocation(zipcode)
}


// View - Update DOM
let updateDOM = () => {
  let report = currentWeather.info.daily.data

  location.innerHTML = `${currentWeather.city}, ${currentWeather.state}`
  date.innerHTML = currentWeather.date
  temp.innerHTML = `${Math.round(report[0].temperatureHigh)}°F / ${Math.round(report[0].temperatureLow)}°F`
  summary.innerHTML = report[0].icon
  img.src = `https://weather-app-git.s3-us-west-1.amazonaws.com/${report[0].icon}.png`
}

search.addEventListener('click', getWeather);
input
input.addEventListener('input', logInput);
