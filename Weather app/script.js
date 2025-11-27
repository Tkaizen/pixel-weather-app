const apiKey = "27439c77b53c23ae49d693526615f988";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const statusEl = document.getElementById("status");

const tempEl = document.getElementById("temp");
const descEl = document.getElementById("description");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const tomorrowEl = document.getElementById("tomorrow");
const adviceEl = document.getElementById("advice");

// helper to choose a message based on weather description
function getAdvice(main) {
    const text = main.toLowerCase();
    if (text.includes("rain")) return "Take an umbrella & cozy hoodie.";
    if (text.includes("cloud")) return "Perfect for a chill walk.";
    if (text.includes("clear")) return "Grab sunglasses and enjoy the sun.";
    if (text.includes("snow")) return "Bundle up, it’s snow time.";
    return "Check the sky and enjoy the day.";
}

async function fetchWeather(city) {
    statusEl.textContent = "Loading...";
    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
                city
            )}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);

        if (res.status === 401) {
            throw new Error("Invalid API Key");
        }
        if (!res.ok) {
            throw new Error("City not found");
        }
        const data = await res.json();

        const temp = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const wind = Math.round(data.wind.speed * 3.6); // m/s → km/h
        const main = data.weather[0].main;
        const description = data.weather[0].description;
        const timezoneOffset = data.timezone; // seconds

        // Calculate local time at the city
        // 1. Get current UTC time in ms
        const now = new Date();
        const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
        // 2. Add the city's timezone offset (in ms)
        const localDate = new Date(utcMs + (timezoneOffset * 1000));
        const hour = localDate.getHours();

        // Determine period
        let period = "night";
        if (hour >= 6 && hour < 12) {
            period = "morning";
        } else if (hour >= 12 && hour < 18) {
            period = "noon";
        }

        updateTheme(period);

        tempEl.textContent = `${temp}°C`;
        descEl.textContent = `It's a ${description} day...`;
        humidityEl.textContent = humidity;
        windEl.textContent = wind;

        // fake tomorrow forecast: just vary current condition a bit
        tomorrowEl.textContent =
            temp > 25 ? "Sunny & warm" : temp < 10 ? "Cool & breezy" : "Mild & comfy";

        adviceEl.textContent = getAdvice(main);
        statusEl.textContent = "";
    } catch (err) {
        console.error(err);
        if (err.message === "Invalid API Key") {
            statusEl.textContent = "Invalid API Key!";
            descEl.textContent = "Please update script.js";
        } else {
            statusEl.textContent = "Could not load city.";
            descEl.textContent = "Try another place.";
        }
        tempEl.textContent = "--°C";
        humidityEl.textContent = "--";
        windEl.textContent = "--";
        tomorrowEl.textContent = "--";
        adviceEl.textContent = "--";
    }
}

function updateTheme(period) {
    const windowEl = document.querySelector('.window');
    // Remove old classes
    windowEl.classList.remove('is-morning', 'is-noon', 'is-night');
    // Add new class
    windowEl.classList.add(`is-${period}`);
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (!city) {
        statusEl.textContent = "Type a city first.";
        return;
    }
    fetchWeather(city);
});

// allow Enter key
cityInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// default city when app opens
fetchWeather("London");
