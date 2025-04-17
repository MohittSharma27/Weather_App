function getWeather() {
    const apiKey = 'd6bec5bc3e754b2f9a8145413250104';
    const city = document.getElementById('city').value.trim();

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const forecastUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1`;

    // Fetch current weather
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    // Fetch hourly forecast
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            const hourlyData = data.forecast.forecastday[0].hour;
            displayHourlyForecast(hourlyData);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayWeather(data) {
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Clear previous content
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    const cityName = data.location.name;
    const temperature = Math.round(data.current.temp_c);
    const description = data.current.condition.text;
    const iconUrl = `https:${data.current.condition.icon}`;

    const temperatureHTML = `<p>${temperature}°C</p>`;
    const weatherHtml = `
        <p><strong>${cityName}</strong></p>
        <p>${description}</p>
    `;

    tempDivInfo.innerHTML = temperatureHTML;
    weatherInfoDiv.innerHTML = weatherHtml;
    weatherIcon.src = iconUrl;
    weatherIcon.alt = description;

    showImage();
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    hourlyForecastDiv.innerHTML = '';

    const nextHours = hourlyData.slice(0, 8); // Show next 8 hours

    nextHours.forEach(item => {
        const time = item.time.split(' ')[1]; // HH:MM
        const temperature = Math.round(item.temp_c);
        const iconUrl = `https:${item.condition.icon}`;

        const hourlyItemHtml = `
            <div class="hourly-item" style="margin: 5px; padding: 10px; border: 1px solid #ccc; border-radius: 8px; display: inline-block; text-align: center;">
                <span>${time}</span><br>
                <img src="${iconUrl}" alt="Hourly Icon"><br>
                <span>${temperature}°C</span>
            </div>
        `;

        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
