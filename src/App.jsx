
import { useEffect } from 'react'
import './App.css'
import { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';

const key = '2415edee07c6d2dfe610d8602adbd78f';

function App() {

  const [weather, setweather] = useState();
  const [coords, setcoords] = useState();
  const [temp, settemp] = useState();
  const [loading, setLoading] = useState(true);

  const success = (pos) => {
    setcoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, [])

  
  useEffect(() => {
    if (coords) {
      const {lat, lon} = coords;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
      axios.get(url)
      .then(res => {
        const kel = res.data.main.temp;
        const cel = (kel - 273.15).toFixed(2);
        const fah = (cel *9/5 +32).toFixed(2);
        settemp({cel: cel, fah: fah});
        setweather(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout (() => {
          setLoading(false);
        }, 2000);
      });
    }

  }, [coords])

  
 
  return (
   <div className='app'>
    {
      loading ? 
      <figure className='app_img'>
        <img src="https://i.pinimg.com/originals/67/56/66/675666d840a9c8fa1c61eaf584ff2a50.gif" alt="LOADING" />
      </figure>
      :
      <WeatherCard
        weather = {weather}
        temp = {temp}
      />
    }
   </div>
  )
}

export default App
