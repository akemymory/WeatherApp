const apiKey = "8f1f02ca3a02460bcefe3eff78e9a6d6";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  document.querySelector(".error").style.display = "none";

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent =
      Math.round(data.main.temp) + "ºc";
    document.querySelector(".humidity").textContent = data.main.humidity + "%";
    document.querySelector(".wind").textContent = data.wind.speed + "km/h";

    const cityTimezone = data.timezone / 3600;
    const currentTime = new Date(
      new Date().getTime() + cityTimezone * 3600 * 1000
    );

    const localTimeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedLocalTime = currentTime.toLocaleString(
      undefined,
      localTimeOptions
    );

    const hours = currentTime.getHours();

    const isDay = hours >= 6 && hours < 18;

    const cardContainer = document.querySelector(".card");

    if (isDay) {
      cardContainer.style.background =
        "linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)";
      document.querySelector(".card").style.color = "black";

      document.querySelector(".col:nth-child(1) img").src =
        "images/humidity.png";
      document.querySelector(".col:nth-child(2) img").src = "images/wind.png";
    } else {
      cardContainer.style.background =
        "linear-gradient(to top, #09203f 0%, #537895 100%)";
      document.querySelector(".card").style.color = "white";

      document.querySelector(".col:nth-child(1) img").src =
        "images/humidity-white.png";
      document.querySelector(".col:nth-child(2) img").src =
        "images/wind-white.png";
    }

    if (data.weather[0].main == "Clouds") {
      if (isDay) {
        weatherIcon.src = "images/clouds.png";
      } else {
        weatherIcon.src = "images/clouds-night.png";
      }
    } else if (data.weather[0].main == "Clear") {
      if (isDay) {
        weatherIcon.src = "images/clear-day.png";
      } else {
        weatherIcon.src = "images/clear-night.png";
      }
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    } else if (data.weather[0].main == "Overcast clouds") {
      if (isDay) {
        weatherIcon.src = "images/clouds.png";
      } else {
        weatherIcon.src = "images/clouds-night.png";
      }
    }

    document.querySelector(".city").innerHTML += `<br>${formattedLocalTime}`;
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBox.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    checkWeather(searchBox.value);
  }
});

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  checkWeather(searchBox.value);
});
