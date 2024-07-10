// script.js

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const apiKey = '27a0ddb3221d4d3598180441240807'; 
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            displayCurrentWeather(data);
            getExtendedForecast(city, apiKey);
        } else {
            alert(`City not found: ${data.error.message}`);
        }
    } catch (error) {
        alert('Error fetching weather data');
        console.error('Error:', error);
    }
}

function displayCurrentWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = `
        <p><strong>City:</strong> ${data.location.name}</p>
        <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>
        <p><strong>Weather:</strong> ${data.current.condition.text}</p>
        <p><strong>Humidity:</strong> ${data.current.humidity} %</p>
        <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
    `;
}

async function getExtendedForecast(city, apiKey) {
    const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`;

    try {
        const response = await fetch(forecastUrl);
        const data = await response.json();

        if (response.ok) {
            displayExtendedForecast(data.forecast.forecastday);
        } else {
            alert(`Error fetching extended forecast: ${data.error.message}`);
        }
    } catch (error) {
        alert('Error fetching extended forecast');
        console.error('Error:', error);
    }
}

function displayExtendedForecast(forecast) {
    const extendedForecast = document.getElementById('extendedForecast');
    let forecastHTML = '<h2>7-Day Forecast</h2><div class="forecast-container">';
    
    forecast.forEach(day => {
        forecastHTML += `
            <div class="forecast-day">
                <p>Date: ${day.date}</p>
                <p>Max Temperature: ${day.day.maxtemp_c} °C</p>
                <p>Min Temperature: ${day.day.mintemp_c} °C</p>
                <p>Weather: ${day.day.condition.text}</p>
            </div>
        `;
    });

    forecastHTML += '</div>';
    extendedForecast.innerHTML = forecastHTML;
}
