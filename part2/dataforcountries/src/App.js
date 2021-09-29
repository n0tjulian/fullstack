import React, { useState, useEffect} from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

function App() {

  const [countryData,setCountryData] = useState([])
  const [searchCountries,setSearchCountries] = useState('')
  
  
  const updateSearchField = (event) => {
    setSearchCountries(event.target.value)
  }

  const updateSearchFieldWithButton = (search) => {
    setSearchCountries(search)
  }

  const updateSearchCountries = (event) => {
    let newCountryData = JSON.parse(event.target.value)
    updateSearchFieldWithButton(newCountryData.name.common)
  }

  useEffect(() => {
    axios.get('https://restcountries.com/v3/all').then(response => {
      setCountryData(response.data)
    })
  }, [])

  const outputCountries = countryData.filter((country) => {
    
    return country.name.common.toLowerCase().includes(searchCountries.toLowerCase())
    
  })

  return (
    <div>
      <SearchAndTitle searchCountries={searchCountries} updateSearchField={updateSearchField}/>
     
      <CountryInformation outputCountries={outputCountries} updateSearchCountries={updateSearchCountries} />
    </div>
  );
}

const SearchAndTitle = ({searchCountries,updateSearchField}) => {

  return(
    <div>
      <p>countries</p>
      <input value={searchCountries} onChange={updateSearchField}/>
    </div>
  )
}

const CountryInformation = ({outputCountries,updateSearchCountries}) => {
  

  if(outputCountries.length===0){
    return(
      <div>
        <p>no countries</p>
      </div>
    )

  }else if(outputCountries.length===1){
    const specificCountry = outputCountries[0]
    return(
      <div>
        <SpecificCountry name={specificCountry.name.common} capital={specificCountry.capital} population={specificCountry.population} languages={specificCountry.languages} flag={specificCountry.flags[0]}/>

      </div>
    )
  
  }else if(outputCountries.length > 10){
  return(
    <div>
      <p>too many countries</p>
    </div>
  )

  }else if(outputCountries.length <= 10 && outputCountries.length>1){
    
    return(
      <div>
        <ul>
          {outputCountries.map((country) => {
            // console.log(country.name)
            return <li key={country.name.common}>{country.name.common} <button value={JSON.stringify(country)} onClick={updateSearchCountries}>press me</button></li>
          })}
        </ul>
      </div>
    )
  }
}

const SpecificCountry = ({name,capital,population,languages,flag}) => {
  
  let languagesArray = Object.values(languages)

  return(
    <div>
      <h1>{name}</h1>
      <p>capital: {capital} </p>
      <p>population: {population} </p>

      <h1>languages</h1>
      <ul>
      {languagesArray.map(language => {
        return <li key={language}>{language}</li>
      })}

      </ul>

      <h1>Flag</h1>
      <img src={flag} alt="flag" height="200px" width="200px"></img>

      
      <Weather capital={capital[0]} />
      
    </div>
  )
}

const Weather = ({capital}) => {
  
  const [weatherState,setWeatherState] = useState({})

  // axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`).then(response => {
  //   console.log(response.data.location.name)
  //   console.log(response.data.current.temperature)
  //   console.log(response.data)
  //   setWeatherState(response)
  // })

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`).then(response => {
      console.log("effect response",response.data)
      setWeatherState(response.data)
    })
  },[])
  
  if(weatherState.current){
    return (
      <div>
        {/* {console.log("weather state is",weatherState)} */}
        <h1>weather in {weatherState.location.name} </h1>
        <p>temperature: {weatherState.current.temperature} celsius</p>
        <img src={weatherState.current.weather_icons[0]} alt="weather"/>
        <p>wind: {weatherState.current.wind_speed} mph, direction: {weatherState.current.wind_dir} </p>
      </div>
    )
  }
  return(
    <div>
      <p>no data yet</p>
    </div>
  )
}

export default App;
