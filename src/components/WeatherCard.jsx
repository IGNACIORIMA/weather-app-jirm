import React, { useState } from 'react'
import './styles/weatherCard.css'

const WeatherCard = ({weather, temp}) => {

    const [isCel, setIsCel] = useState(true)
    const handleTemp = () =>{
        setIsCel(!isCel)
    }

  return (
    <div className='weathercard'>
        <div>
            <section className='weathercard_header'>
        <h1 className='weathercard_title'>Weather App</h1>
        <h2 className='weathercard_city'>{weather?.name} {weather?.sys.country}</h2>
            </section>
        </div>
        <section className='weathercard_body'>
            <figure className='weathercard_img'>
                <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="weather image" />
            </figure>
            <article className='weathercard_data'>
                <h3 className='weathercard_description'>'{weather?.weather[0].description}'</h3>
                <ul className='weathercard_list'>
                    <li className='weathercard_item'><span>Wind Speed:</span><span> {weather?.wind.speed}m/s</span></li>
                    <li className='weathercard_item'><span>Clouds:</span><span> {weather?.clouds.all}%</span></li>
                    <li className='weathercard_item'><span>Pressure:</span><span> {weather?.main.pressure}hPa</span></li>
                </ul>
                <h2 className='weathercard_temp'>
                    {
                        isCel ? 
                            temp?.cel + ' °C'
                            : 
                            temp?.fah + ' °F'
                    }
                </h2>
                <button className='weathercard_btn' onClick={handleTemp}>
                    Change to {isCel ? '°F' : '°C'}
                </button>
            </article>
        </section>
    </div>
  )
}

export default WeatherCard