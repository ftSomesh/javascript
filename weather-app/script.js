const apiKey = "27fa8672952c4b7cf36ed673f2b71fec";
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;



const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")
const errorMsg = document.querySelector(".error");
const weather = document.querySelector(".weather");
const weatherIconsArr = ["clear", "clouds", "drizzle", "humidity", "mist", "rain", "search", "snow", "wind", "haze"]

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city.trim() + `&appid=${apiKey}`)
        console.log(response);
        if (response.status == 404) {
            errorMsg.textContent = "Invalid City Name";
            errorMsg.style.display = "block";
            weather.style.display = "none";

        } else {
            var data = await response.json();

            document.querySelector(".city").textContent = data.name
            document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C"
            document.querySelector(".humidity").textContent = data.main.humidity + "%"
            document.querySelector(".wind").textContent = data.wind.speed + " km/h"

            if (weatherIconsArr.includes(data.weather[0].main.toLocaleLowerCase())) {
                weatherIcon.src = `images/${data.weather[0].main.toLocaleLowerCase()}.png`;
                weatherIcon.alt = data.weather[0].description
            }
            weather.style.display = "block"
            errorMsg.textContent = ''
            errorMsg.style.display = "none"
            searchBox.value = ''
        }
    } catch (error) {
        console.log(error);
        weather.style.display = "none"
        errorMsg.style.display = "block"
        errorMsg.textContent = "Network error"
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
