import React, { useState } from "react";
import axios from "axios";

import './Design.css';

function Weather() {
    const [inputCity, setInputCity] = useState('');
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const showWeather = () => {
        console.log("Showing weather");
        let saveddata = localStorage.getItem(city.toLowerCase().trim());
        if (saveddata == null) {
            console.log("No data");
            return;
        }
        const wd = JSON.parse(saveddata);

        const outputdiv = document.getElementById("currentweather");
        outputdiv.innerHTML = `
            <b>Description:</b> ${wd.weather[0].description}<br>
            <b>Humidity:</b> ${wd.main.humidity}%<br>
        `;

        console.log(saveddata);
    }

    const Sky = () => {
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4a1f8a61b74546825af1e0be106e797b&units=metric`;
        axios.get(baseURL).then((response) => {
            setWeather(response.data);
            localStorage.setItem(city.toLowerCase().trim(), JSON.stringify(response.data));
            showWeather();
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            setWeather(null);
        });
    };

    const handleInputChange = (event) => {
        setInputCity(event.target.value);
    };
    const handleSearch = () => {
        setCity(inputCity);
        Sky();  
    };

    function storeData() {
        if (localStorage) {
            document.getElementById('output').innerHTML = 'Data storage successfully';
        } else {
            document.getElementById('output').innerHTML = 'Not storage Data';
        }
    }

    function retrieveData() {  
        document.getElementById('output').innerHTML = '';
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));

            document.getElementById('output').innerHTML += `
                <b>City:</b> ${key}<br>
                <b>Temperature:</b> ${value.main.temp}°C<br>
                <b>Weather:</b> ${value.weather[0].main}<br>
                <b>Description:</b> ${value.weather[0].description}<br>
                <b>Humidity:</b> ${value.main.humidity}%<br>
                <b>Wind Speed:</b> ${value.wind.speed} m/s<br><br>
            `;
        }
    }

    return (
        <div className='col3'>
            <center>
                <h1 className="col">CHECK WEATHER</h1>
                <input className="col1" type="text" value={inputCity} onChange={handleInputChange} placeholder="Enter city name" /><br /><br />
                <button className="col2" onClick={handleSearch}>Get Weather</button>
                <button className="design1" onClick={storeData}>storeData</button>
                <button className="design2" onClick={retrieveData}>retrieveData</button>

                <p id='output'></p>

                {weather && (
                    <div>
                        <h1 className="col11" ></h1>
                        <h2 className="col5" ><b>{weather.name}</b></h2>
                        <p className="col6" ><b>Temperature: {weather.main.temp}°C <img className="design" src="https://openweathermap.org/img/w/01d.png" alt="icon" /></b></p>
                        <p className="col7" ><b>Weather: {weather.weather[0].main}</b></p>
                        <p className="col8" ><b>Description: {weather.weather[0].description}</b></p>
                        <p className="col9" ><b>Humidity: {weather.main.humidity}%</b></p>
                        <p className="col10"><b>Wind Speed: {weather.wind.speed} m/s</b></p><br /><br />
                    </div>
                )}
            </center>
            <div id="currentweather"></div>
        </div>
    );
};

export default Weather;
