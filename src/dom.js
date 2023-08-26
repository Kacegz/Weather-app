import { getWeather } from "./weather";
import { format } from "date-fns";
import sunnyBackground from "./assets/sunny.jpg";
import cloudyBackground from "./assets/cloudy.jpg";
import stormyBackground from "./assets/stormy.jpg";
import nightBackground from "./assets/night.jpg";
import defaultBackground from "./assets/default.jpg";
let choice = "c";
async function updateDom(fetchedData) {
  const error = document.querySelector("#error");
  const loading = document.querySelector("#modal");
  /*
  loading.showModal();
  fetchedData
    .then((processedData) => {
      error.textContent = "";
      realtimeDOM(processedData);
      forecastDOM(processedData.forecastData);
      changeBackground(processedData.realTime);
      modal.close();
    })
    .catch((err) => {
      console.log(err);
      error.textContent = "Something went wrong, try again";
      loading.close();
    });
}*/
  loading.showModal();
  try {
    const processedData = await fetchedData;
    error.textContent = "";
    realtimeDOM(processedData);
    forecastDOM(processedData.forecastData);
    changeBackground(processedData.realTime);
    modal.close();
  } catch (e) {
    error.textContent = "Something went wrong, try again";
    loading.close();
  }
}
//reworked using await :)
function realtimeDOM(processedData) {
  let currentChoice = "c";
  const location = document.querySelector(".location");
  location.textContent = processedData.locationData.city + ", ";
  const country = document.querySelector(".country");
  country.textContent = processedData.locationData.country;
  const date = document.querySelector(".date");
  const time = document.querySelector(".time");
  let fetchedDate = processedData.locationData.time;
  let formattedDate = format(new Date(fetchedDate), "eeee, do MMM yyyy");
  let formattedHours = format(new Date(fetchedDate), "h:mm aa");
  date.textContent = formattedDate;
  time.textContent = formattedHours;
  const condition = document.querySelector(".condition");
  condition.textContent = processedData.realTime.condition.text;
  const temp = document.querySelector(".temp");
  const feelstemp = document.querySelector(".feels");
  const icon = document.querySelector(".icon");
  icon.src = "https:" + processedData.realTime.condition.icon;
  temp.textContent = processedData.realTime.tempC + " °C";
  feelstemp.textContent = processedData.realTime.feelsC + " °C";
  const humidity = document.querySelector(".humid");
  humidity.textContent = processedData.realTime.humidity + "%";
  const rain = document.querySelector(".rain");
  rain.textContent = processedData.realTime.cloud + "%";
  const wind = document.querySelector(".speed");
  wind.textContent = processedData.realTime.wind + " km/h";
  const pressure = document.querySelector(".pressure");
  pressure.textContent = processedData.realTime.pressure + " hPa";
}
function forecastDOM(fetchedData) {
  const bottom = document.querySelector("#bottom");
  bottom.textContent = "";
  fetchedData.forEach((day) => {
    const forecastDay = document.createElement("div");
    forecastDay.classList.add("day");
    const forecastDate = document.createElement("h2");
    const formattedForecastDate = format(new Date(day.date), "EEEE");
    forecastDate.textContent = formattedForecastDate;
    const forecastConditionIcon = document.createElement("img");
    forecastConditionIcon.src = "https:" + day.day.condition.icon;
    const forecastTemp = document.createElement("h1");
    forecastTemp.classList.add("forecasttemp");
    forecastTemp.textContent = day.day.avgtemp_c + "°C";
    const forecastRain = document.createElement("h3");
    forecastRain.textContent =
      "Rain chance: " + day.day.daily_chance_of_rain + "%";

    forecastDay.appendChild(forecastDate);
    forecastDay.appendChild(forecastConditionIcon);
    forecastDay.appendChild(forecastTemp);
    forecastDay.appendChild(forecastRain);
    bottom.appendChild(forecastDay);
  });
}
function clickHandler() {
  const search = document.querySelector(".search");
  search.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      let data = getWeather(search.value);
      search.value = "";
      updateDom(data);
    }
  });
}
function changeBackground(status) {
  const background = document.querySelector("#container");
  if (status.isDay === 0) {
    background.style.backgroundImage = `url(${nightBackground})`;
  } else {
    if (status.condition.text === "Sunny") {
      background.style.backgroundImage = `url(${sunnyBackground})`;
    } else if (
      status.condition.text === "Partly cloudy" ||
      status.condition.text === "Cloudy"
    ) {
      background.style.backgroundImage = `url(${cloudyBackground})`;
    } else if (status.condition.text === "Mist") {
      background.style.backgroundImage = `url(${defaultBackground})`;
    } else {
      background.style.backgroundImage = `url(${stormyBackground})`;
    }
  }
}
function screenHandler() {
  updateDom(getWeather());
  clickHandler();
}
export { screenHandler };
