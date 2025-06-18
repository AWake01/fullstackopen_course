import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import countryService from './services/countries'
import weatherService from './services/weather'
import axios from 'axios'

function App() {
  const [countriesData, setCountriesData] = useState([])
  const [countriesList, setCountriesList] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [searchValue, setSearchValue] = useState(null)
  const [searchMessage, setSearchMessage] = useState(null)
  const [weatherData, setWeatherData] = useState(null)
  const [weatherIcon, setWeatherIcon] = useState('')

  //Inital country data retrieved
  useEffect(() => {
    countryService
      .getCountries()
      .then(response => {
        setCountriesData(response)  
      })
  }, [])

  //Weather data retrieved when country is selected
  useEffect(() => {
    if(selectedCountry != null) {
      console.log('CODE', selectedCountry.cca2)
      weatherService
        .getWeather(selectedCountry.capital, selectedCountry.cca2)
        .then(response => {
          setWeatherData(response)  
          console.log('Weather', response)
        })
    }
  }, [selectedCountry])

  //Show all countries with matching name part
  const searchChange = (event) => {
    let value = event.target.value
    setSearchValue(value)

    const countriesFound = countriesData.filter(country => 
      country.name.common.toLowerCase().includes(value.toLowerCase())
    )
    console.log('length', countriesFound.length)

    if(countriesFound.length == 0) {
      console.log('No countries found ', countriesFound.length)
      setSearchMessage('No countries found')
      setCountriesList(null)
      setSelectedCountry(null)
    }
    else if( countriesFound.length == 1) {
      setSelectedCountry(countriesFound[0])
      setCountriesList(null)
    }
    else if(countriesFound.length > 0 && countriesFound.length < 10){
      console.log('found ', countriesFound.length)
      setSearchMessage(null)
      setCountriesList(countriesFound)
      setSelectedCountry(null)
    }
    else if(countriesFound.length > 10) {
      console.log('Too many matches, specify another filter', countriesFound.length)
      setSearchMessage('Too many matches, specify another filter')
      setCountriesList(null)
      setSelectedCountry(null)
    }
  }

  const showClick = (event) => {
    const country = countriesData.filter(country => 
        country.name.common === event.target.id)
    setSelectedCountry(country[0])  //Returned as a single element in and array otherwise
  }

  return (
    <div>
      <Search onChange={searchChange} searchMessage={searchMessage}></Search>
      <Countries countries={countriesList} onClick={showClick}></Countries>
      <CountryInfo info={selectedCountry} weatherData={weatherData} weatherIcon={weatherIcon}></CountryInfo>
    </div>
  )
}

const Search = ({onChange, searchMessage}) => {
  return (
    <div>
      <p>find countries <input onChange={onChange}></input></p>
      <SearchMessage message={searchMessage}></SearchMessage>
    </div>
  )
}

const SearchMessage= ({message}) => {
  if(message === null) { return }

  return (
    <div>
      <p className='search-message'>{message}</p>
    </div>
  )
}

const Countries = ({countries, onClick}) => {
  if(countries === null) { return }

  return(
    <div>
      {countries.map(country => <CountryLine key={country.name.common} name={country.name.common} showClick={onClick}></CountryLine>)}
    </div>
  )
}

const CountryLine = ({name, showClick}) => {
  return(
      <div className='countryLine-div'>
        {name}
        <button id={name} onClick={showClick}>Show</button>
      </div>
  )
}

const CountryInfo = ({info, weatherData, weatherIcon}) => {
   if(info === null) { return }

  return(
    <div>
      <h1>{info.name.common}</h1>
      <CountryStats info={info}></CountryStats>
      <Languages languages={info.languages}></Languages>
      <Flag flags={info.flags}></Flag>
      <div className='weather-div'><Weather weatherData={weatherData} icon={weatherIcon}></Weather></div>
    </div>
  )
}

const CountryStats = ({info}) => {
  return(
    <div>
        <table className='stat-table'>
          <tbody>
            <CountryStat label='Capital' value={info.capital}></CountryStat>
            <CountryStat label='Area' value={info.area}></CountryStat>
            </tbody>
        </table>
    </div>
  )
}

const CountryStat = ({label, value}) => {
  return(
        <tr>
          <th>{label}</th>
          <td>{value}</td>
        </tr>
  )
}

const Languages = ({languages}) => {
  console.log(languages)
  return(
    <div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(languages).map(([code, language]) => (
          <li key={code}>{language}</li>)
        )}
      </ul>
    </div>
  )
}

const Flag = ({flags}) => {
  console.log(flags)
  return(
    <div>
      <img className='flag-img' src={flags.png}></img>
    </div>
  )
}

const Weather = ({weatherData, weatherIcon}) => {
  if(weatherData != null) {
    const iconCode = weatherData.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`

    return(
      <div>
        <h2>Weather in {weatherData.name}</h2>
        <WeatherStat label={'Temperature'} value={weatherData.main.temp} units='&#8451;'></WeatherStat>
        <div className='weatherIcon-div'><img className='weatherIcon-img' src={iconUrl}/></div>
        <WeatherStat label={'Speed'} value={weatherData.wind.speed} units='m/s'></WeatherStat>
      </div>
    )
  }
}

const WeatherStat = ({label, value, units}) => {
  return(
    <table className='stat-table'>
          <tbody>
            <tr>
              <th>{label}</th>
              <td>{value} {units}</td>
            </tr>
      </tbody>
    </table>
  )
}

export default App