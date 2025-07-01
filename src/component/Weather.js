import React, { useState } from "react";
import axios from "axios";
import './Design.css';

function Weather() {
    const [inputCity, setInputCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [retrievedData, setRetrievedData] = useState(null);
    const [storageList, setStorageList] = useState([]);

    const handleSearch = () => {
        const cityName = inputCity.trim();
        const baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=4a1f8a61b74546825af1e0be106e797b&units=metric`;

        axios.get(baseURL)
            .then((response) => {
                setWeather(response.data);
                showWeather(cityName);
            })
            .catch(error => {
                console.error("Error fetching weather:", error);
                setWeather(null);
            });
    };

    const showWeather = (cityName) => {
        const savedData = localStorage.getItem(cityName.toLowerCase().trim());
        if (!savedData) {
            setRetrievedData(null);
            return;
        }
        setRetrievedData(JSON.parse(savedData));
    };

    const handleInputChange = (event) => {
        setInputCity(event.target.value);
    };

    function storeData() {
        if (!weather) {
            alert("Please fetch weather first using 'Get Weather'");
            return;
        }

        const cityName = inputCity.trim().toLowerCase();
        if (cityName) {
            localStorage.setItem(cityName, JSON.stringify(weather));
            alert("Data stored successfully in localStorage.");
        } else {
            alert("City name is empty.");
        }
    }

    function retrieveData() {
        const tempList = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const raw = localStorage.getItem(key);
            try {
                const parsed = JSON.parse(raw);
                tempList.push({
                    key: key,
                    name: parsed.name,
                    temp: parsed.main.temp,
                    desc: parsed.weather[0].description,
                    humidity: parsed.main.humidity,
                    wind: parsed.wind.speed
                });
            } catch (e) {
                console.warn(`Failed to parse data for key ${key}`);
            }
        }
        setStorageList(tempList);
    }

    function deleteItem(key) {
        localStorage.removeItem(key);
        retrieveData();
    }

    function clearAllStorage() {
        localStorage.clear();
        setStorageList([]);
    }

    const isRaining = weather?.weather[0]?.main?.toLowerCase().includes("rain") ||
                      weather?.weather[0]?.main?.toLowerCase().includes("drizzle");

    return (
        <div className='col3'>
            {isRaining && (
                <div className="rain">
                    {Array.from({ length: 100 }).map((_, i) => (
                        <div
                            key={i}
                            className="drop"
                            style={{
                                left: Math.random() * 100 + 'vw',
                                animationDuration: Math.random() * 1 + 0.5 + 's',
                                animationDelay: Math.random() * 2 + 's',
                            }}
                        />
                    ))}
                </div>
            )}

            <center>
                <h1 className="col">🗲 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 CHECK WEATHER 🗲</h1>
                <input
                    className="col1"
                    type="text"
                    value={inputCity}
                    onChange={handleInputChange}
                    placeholder="Enter city name"
                />

                <div className="button-container">
                    <button className="btn" onClick={handleSearch}>Get Weather</button>
                    <button className="btn" onClick={storeData} disabled={!weather}>Store Data</button>
                    <button className="btn" onClick={retrieveData}>Retrieve Data</button>
                    <button className="btn clear" onClick={clearAllStorage}>Clear All</button>
                </div>

                {weather && (
                    <div>
                        <h2 className="col5"><b>{weather.name}</b></h2>
                        <p className="col6">
                            <b>☆ Temperature : {weather.main.temp}°C
                                <img className="design" src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="icon" />
                            </b>
                        </p>
                        <p className="col7"><b>☆ Weather : {weather.weather[0].main}</b></p>
                        <p className="col8"><b>☆ Description : {weather.weather[0].description}</b></p>
                        <p className="col9"><b>☆ Humidity : {weather.main.humidity}%</b></p>
                        <p className="col10"><b>☆ Wind Speed : {weather.wind.speed} m/s</b></p><br /><br />
                    </div>
                )}

                {retrievedData && (
                    <div className="retrieved-card">
                        <h3><b>Weather data from Local Storage:</b></h3>
                        <p><b>City: {inputCity}</b></p>
                        <p><b>Weather: {retrievedData.weather[0].description}</b></p>
                        <p><b>Humidity: {retrievedData.main.humidity}%</b></p>
                    </div>
                )}

                {storageList.length > 0 && (
                    <div id="output">
                        <h3>Local Storage Items:</h3>
                        {storageList.map((item, index) => (
                            <div key={index} className="storage-item">
                                <p><b>City:</b> {item.name}</p>
                                <p><b>Temp:</b> {item.temp}°C</p>
                                <p><b>Description:</b> {item.desc}</p>
                                <p><b>Humidity:</b> {item.humidity}%</p>
                                <p><b>Wind:</b> {item.wind} m/s</p>
                                <button className="delete-btn" onClick={() => deleteItem(item.key)}>Delete</button>
                                <hr />
                            </div>
                        ))}
                    </div>
                )}
            </center>
        </div>
    );
}

export default Weather;
