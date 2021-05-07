import { convertDate } from "./utils";
import { fetchLocation, fetchWeather} from './weatherApi';
import { fetchProducts } from './productApi';
const dateFormat = require("dateformat");

// Manage State
let zipcode;
let productData = {occasion: '', weather: '', gender: ''};
let currentWeather = {
};
const date = new Date();
const formattedDate = dateFormat(date, "dddd mmmm dS, yyyy");

// Query Selectors
const search = document.getElementById("input-btn");
const input = document.getElementById('city-input');
const location = document.getElementById('location');
const displayDate = document.getElementById('date');
const temp = document.getElementById('temp');
const summary = document.getElementById('summary');
const img = document.getElementById('weather-img');
const modal = document.getElementById('modal');
const enterBtn = document.getElementById('enter-btn');
const select = document.querySelectorAll('select');
const image = document.querySelectorAll('.img');

const getProducts = async (e) => {
  e.preventDefault()
  let {occasion, weather, gender} = productData

  modal.style.visibility = 'hidden';

  occasion = select[0].value
  weather = select[1].value
  gender = select[2].value

  const letter = await fetchProducts(occasion, weather, gender)

  image[0].src = letter[0].img
  image[1].src = letter[1].img
  image[2].src = letter[2].img
  image[3].src = letter[3].img
};

// Controller - Get Weather Data / Update State
const getWeather = async (e) => {
  e.preventDefault()
  zipcode = input.value

  const location = await fetchLocation(zipcode)
  currentWeather = location
  const weather = await fetchWeather(location, date)
  currentWeather.info = weather

  updateDOM()
};


// View - Update DOM
let updateDOM = () => {
  const { city, regionCode, info:{daily:{data}} } = currentWeather
  const { temperatureHigh, temperatureLow, icon } = data[0]

  location.innerHTML = `${city}, ${regionCode}`
  displayDate.innerHTML = formattedDate
  temp.innerHTML = `${Math.round(temperatureHigh)}°F / ${Math.round(temperatureLow)}°F`
  summary.innerHTML = icon
  img.src = `https://weather-app-git.s3-us-west-1.amazonaws.com/${icon}.png`
};

search.addEventListener('click', getWeather);
enterBtn.addEventListener('click', getProducts);
