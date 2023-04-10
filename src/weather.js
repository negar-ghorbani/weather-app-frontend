const weatherCodeDb = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'partly cloudy', 3: 'overcast', 45: 'Fog', 48: 'depositing rime fog',
    51: 'Drizzle: Light', 53: 'Drizzle: Moderate', 55: 'Drizzle: Dense intensity', 56: 'Freezing Drizzle: Light', 57: 'Freezing Drizzle: Dense intensity',
    61: 'Rain: Slight', 63: 'Rain: Moderate', 65: 'Rain: Heavy intensity', 66: 'Freezing Rain: Light', 67: 'Freezing Rain: Heavy intensity',
    71: 'Snow fall: Slight', 73: 'Snow fall: Moderate', 75: 'Snow fall: Heavy intensity', 77: 'Snow grains',
    80: 'Rain showers: Slight', 81: 'Rain showers: Moderate', 82: 'Rain showers: Violent', 85: 'Snow showers slight', 86: 'Snow showers heavy',
    95: 'Thunderstorm: Slight or moderate', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail'

}
const addWeatherIcon = (weatherCode, hour) => {
    const icon = document.getElementById('icon');
    if (weatherCode === 0 & 6 <= hour <= 17) {
        icon.innerHTML = '<i class="fa-solid fa-sun"></i>'
    }
    else if (weatherCode === 0 & 0 <= hour < 6 | weatherCode === 0 & 17 < hour <= 24) {
        icon.innerHTML = '<i class="fa-solid fa-moon"></i>'
    }
    else if (weatherCode === 1 | 2 & 6 <= hour <= 17) {
        icon.innerHTML = '<i class="fa-solid fa-cloud-sun"></i>'
    }
    else if (weatherCode === 1 | 2 & 0 <= hour < 6 | weatherCode === 1 | 2 & 17 < hour <= 24) {
        icon.innerHTML = '<i class="fa-solid fa-cloud-moon"></i>'
    }
    else if (weatherCode === 3) {
        icon.innerHTML = '<i class="fa-solid fa-cloud"></i>'
    }
    else if (weatherCode === 45 | 48) {
        icon.innerHTML = '<i class="fa-solid fa-smog"></i>'
    }
    else if (weatherCode === 51 | 53 | 55 | 56 | 57) {
        icon.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>'
    }
    else if (weatherCode === 61 | 63 | 65 | 66 | 67 | 80 | 81 | 82) {
        icon.innerHTML = '<i class="fa-solid fa-cloud-showers-heavy"></i>'
    }
    else if (weatherCode === 71 | 73 | 75 | 77 | 85 | 86) {
        icon.innerHTML = '<i class="fa-regular fa-snowflake"></i>'
    }
    else if (weatherCode === 95 | 96 | 99) {
        icon.innerHTML = '<i class="fa-solid fa-cloud-bolt"></i>'
    }
}

const weatherApi = () => {
    document.getElementById("current_weather").style.display = "flex";
    const temperature = document.getElementById('temperature');
    const time = document.getElementById('time');
    const windDirection = document.getElementById('wind_direction');
    const windSpeed = document.getElementById('wind_speed');
    const weatherCode = document.getElementById('weather_code');
    const locationInput = document.getElementById('location');
    const place = document.getElementById('place');
    const toggleClassList = document.querySelector('.unit-toggle .toggle').classList;
    const unit = toggleClassList.contains('off') ? 'celsius' : 'fahrenheit';
    let item = JSON.parse(localStorage.getItem('data')).find(e => e.name === locationInput.value);
    fetch(`${process.env.API_HOST}/api/weather?latitude=${item.lat}&longitude=${item.lon}&unit=${unit}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.current_weather.weathercode, Number((data.current_weather.time.split('T')[1]).split(':')[0]));
            addWeatherIcon(data.current_weather.weathercode, Number((data.current_weather.time.split('T')[1]).split(':')[0]))
            place.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${item.name}`
            temperature.innerHTML = `temperature : ${data.current_weather.temperature}`;
            if (unit == 'celsius') {
                temperature.innerHTML += '&#x2103';
            }
            else {
                temperature.innerHTML += '&#x2109';
            }
            date = new Date(data.current_weather.time);
            time.innerHTML = `<i class="fa-regular fa-clock"></i> ${date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()} ${data.current_weather.time.split('T')[1]}`;
            windDirection.innerHTML = `windDirection: ${data.current_weather.winddirection} &#xb0`;
            windSpeed.innerHTML = `windSpeed: ${data.current_weather.windspeed} km/h`;
            weatherCode.innerHTML = weatherCodeDb[data.current_weather.weathercode];

        }
        );
}