import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import Loading from './components/Loading'
function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
const [temp, setTemp] = useState()

  const success = (pos)=>{
    const coord =pos.coords
    setCoords({
      lat: coord.latitude,
      lon: coord.longitude
    })
  }
//https://api.openweathermap.org/data/2.5/weather?lat=8.2666788&lon=-73.3662396&appid=2f4a0f2689b0813ede1558733f49b3c9
  const openWeathermap = ()=>{
    const apiKey = 'ed5f18551a2159b2f2a7ae81ad058138'
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
    axios.get(url)
    .then(res =>{
      setWeather(res.data)
      const celsius = (res.data.main.temp - 273.15).toFixed(1)
      const farenheit = (celsius * (9/5) +32).toFixed(1)
      setTemp({celsius,farenheit})
      
    })
    .catch(err => console.log(err))
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)       
  }, [])

  //Con este useEffect va observar si hubo cambio en el coords
  //cuando sea true ejecuta la funcion openWethermap
  useEffect(() => {  
    if(coords){
      openWeathermap()
    }
  }, [coords])

 
  console.log(weather)
  
  return (
    <div className="App">
      {
        weather ?
        <WeatherCard weather={weather} temp = {temp}/>
        :<Loading/>
      }
    </div>
  )
}

export default App
