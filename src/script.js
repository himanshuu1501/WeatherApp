const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchbtn");
const weather_img = document.querySelector(".weather-img");
const weather_body = document.querySelector(".weather-body");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");

async function checkWeather(city) {
  const api_key = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((Response) =>
    Response.json()
  );
  //checking correct city or not

  if (city.trim() === "") {
    alert("! Location can't be empty");
    return;
  } else if (weather_data.cod == "404") {
    alert("! Enter Correct Location");
    return;
  } else {
    weather_body.style.display = "flex";
  }

  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  description.innerHTML = `${weather_data.weather[0].description}`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}km/hr`;

  switch (weather_data.weather[0].main) {
    case "Clouds":
      weather_img.src = "/images/clouds.png";
      break;
    case "Clear":
      weather_img.src = "/images/clear.jpg";
      break;
    case "Rain":
      weather_img.src = "/images/rain.png";
      break;
    case "Mist":
      weather_img.src = "/images/mist.png";
      break;
    case "Snow":
      weather_img.src = "/images/snow.png";
      break;
  }

  console.log(weather_data);
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
inputBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkWeather(inputBox.value);
  }
});
