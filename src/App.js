import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './styles.css'

function App() {

  const [weather, setWeather] = useState ({});
  const [isClick, setIsClick] = useState (true);

  const success = (pos) => {
    console.log(pos.coords.latitude)
    const latitude = pos.coords.latitude; 
    const longitude = pos.coords.longitude;

    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=6284237c34c45a71b894c97650d0dc02`)
      .then(res => {
        setWeather(res.data)
      })     
  }

  useEffect (()=> {
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  const convertToCelsius = (kelvin) => kelvin - 273.15;

  const convertToFahrenheit = () => (weather.main?.temp - 273.15) * (9/5) + 32;

  return (
    <div className="App">
      <div className='card'>
        <div className='title'>
          <h1 className='title2'>WEATHER APP</h1>
          <h2>{weather?.name}, {weather.sys?.country} </h2>
        </div>
        
        <div className='information'>
          <div className='temperature'>
            <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
            <p>{isClick ? `${(convertToCelsius(weather.main?.temp)).toFixed(2)} Celsius` : `${(convertToFahrenheit()).toFixed(2)} Fahrenheit`}</p>
          </div>

          <ul className='data'>
            <li><b>"Scatered Clouds"</b></li>
            <li><i class="fa-solid fa-wind"></i> <b>Wind Speed: </b>{weather.wind?.speed}m/s</li>
            <li><b>Clouds: </b>{weather.clouds?.all}%</li>
            <li><b>Pressure: </b>{weather.main?.pressure}hPa</li>
          </ul>
        </div>
      
        <div className='convert'>
          <button onClick={()=>setIsClick(!isClick)}>Convert Degrees to °F/°C</button>
        </div>
        
      </div>
    </div>
  );
}

export default App;
