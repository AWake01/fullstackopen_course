import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import axios from 'axios'

function App() {
  const [countriesData, setCountriesData] = useState([])
  const [countriesList, setCountriesList] = useState(null)
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [searchValue, setSearchValue] = useState(null)
  const [searchMessage, setSearchMessage] = useState(null)

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(response => {
        //console.log(response.data)
        setCountriesData(response.data)
      })
  }, [])

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

  return (
    <div>
      <Search onChange={searchChange} searchMessage={searchMessage}></Search>
      <Countries countries={countriesList}></Countries>
      <CountryInfo info={selectedCountry}></CountryInfo>
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

const Countries = ({countries}) => {
  if(countries === null) { return }

  return(
    <div>
      {countries.map(country => <CountryLine key={country.name.common} name={country.name.common}></CountryLine>)}
    </div>
  )
}

const CountryLine = ({name}) => {
  return(
    <p>{name}</p>
  )
}

const CountryInfo = ({info}) => {
   if(info === null) { return }

  return(
    <div>
      <h1>{info.name.common}</h1>
      <CountryStats info={info}></CountryStats>
      <Languages languages={info.languages}></Languages>
      <Flag flags={info.flags}></Flag>
    </div>
  )
}

const CountryStats = ({info}) => {
  return(
    <div>
        <table>
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
          <td>{label}</td>
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

export default App
