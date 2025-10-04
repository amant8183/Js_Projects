document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

    // const API_KEY = "9aa5e5df284f661bad3083a6df4bf68a"; // should store on env variables
    const API_KEY = "5f56d525d1619d0a2cd2eac4ce55588e"; // should store on env variables

    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        // it may throw an error 
        // server/database is always in another continent(place)

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }


    })

    async function fetchWeatherData(city) {
        // gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found')
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        // shows the data
        console.log(data);
        const {name, main, weather} = data;
        cityNameDisplay.textContent = `City: ${name}`;
        temperatureDisplay.textContent = `Temperature: ${main.temp}`;
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
        //unlocking display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        // shows error      
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
})