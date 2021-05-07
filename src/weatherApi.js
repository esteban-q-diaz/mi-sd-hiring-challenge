export const fetchLocation = (zipcode) => {
 return fetch(`https://se-weather-api.herokuapp.com/api/v1/geo?zip_code=${zipcode}`)
   .then(response => response.json())
   .catch(e => console.log('zip code is not valid', e))
}

export const fetchWeather = (data, date) => {
 const newDate= (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear();

 return fetch(`https://se-weather-api.herokuapp.com/api/v1/forecast?latitude=${data.latitude}&${data.longitude}=-104.2&date=${newDate}`)
   .then(response => response.json())
   .catch(e => console.log('Error getting weather data:', e))
}
