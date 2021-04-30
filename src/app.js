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
let header = document.getElementById('header')
let current = document.getElementById('current')
let tomorrow = document.getElementById('tomorrow')
let twodays = document.getElementById('two-days')
let summary = document.getElementById('weather-sum')
let highLow = document.getElementById('high-low')
let img = document.getElementById('weather-img')

// Controller - Get Weather Data / Update State
export let response = (weatherInfo) => {
  currentWeather = weatherInfo
  console.log(currentWeather)
  updateDOM()
}

let getWeather = async (e) => {
  e.preventDefault()
  fetchLocation(zipcode)
}

let logInput = (e) => {
  let search = e.target.value
  zipcode = search
}


// View - Update DOM
let updateDOM = () => {
  let report = currentWeather.info.daily.data

  header.innerHTML = `Weather Forecast for ${currentWeather.city}`

  current.innerHTML = daysOfWeek[currentWeather.date]

  tomorrow.innerHTML = daysOfWeek[currentWeather.date+1]

  twodays.innerHTML = daysOfWeek[currentWeather.date+2]

  summary.innerHTML = report[0].icon

  highLow.innerHTML = `${report[0].temperatureHigh} / ${report[0].temperatureLow} F`

  img.src = `../img/${report[0].icon}.png`;
}



search.addEventListener('click', getWeather);
input
input.addEventListener('input', logInput);


