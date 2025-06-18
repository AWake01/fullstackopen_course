import axios from 'axios'
const apiKey = import.meta.env.VITE_API_KEY
const iconBaseUrl =  "https://openweathermap.org/img/wn/10d@2x.png"

const getWeather = (city, countryCode) => {
    const location = `${city}, ${countryCode}`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric `
    console.log('URL', url)
    const request = axios.get(url)
    return request.then(response => response.data)
}

export default { getWeather}