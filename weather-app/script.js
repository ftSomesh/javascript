const apiKey = "27fa8672952c4b7cf36ed673f2b71fec";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const error = document.querySelector(".error");
const weather = document.querySelector(".weather");
const weatherIconsArr = ["clear", "clouds", "drizzle", "humidity", "mist", "rain", "search", "snow", "wind", "haze"]

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city.trim() + `$appid=${apiKey}`)
        if (response.status == 404) {
            error.textContent = "Invalid City Name";
            error.style.display = "block";
            weather.style.display = "block";

        } else {
            var data = await response.json();

            document.querySelector(".city").textContent = data.name
            document.querySelector(".temprature").textContent = Math.round(data.main.temp) + "°C"
            document.querySelector(".humidity").textContent = data.main.humidity + "%"
            document.querySelector(".wind").textContent = data.wind.speed + " km/h"

            if (weatherIconsArr.includes(data.weather[0].main.toLocaleLowerCase())) {
                weatherIcon.src = `images/${data.weather[0].main.toLocaleLowerCase()}.png`;
                weatherIcon.alt = data.weather[0].description
            }
            weather.style.display = "block"
            error.textContent = ''
            error.style.display = "none"
            searchBox.value = ''
        }
    } catch (error) {
        weather.style.display = "none"
        error.textContent = "Network Error"
        error.style.display = "block"
    }

}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})
searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        checkWeather(searchBox.value)
    }
})
