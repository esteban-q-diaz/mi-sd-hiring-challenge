export const fetchProducts = (occasion, weather, gender) => {

 return fetch(`https://clothing-api-2021.herokuapp.com/clothing/${occasion}/${weather}/${gender}`)
   .then(response => response.json())
   .catch(e => console.log(e))
}
