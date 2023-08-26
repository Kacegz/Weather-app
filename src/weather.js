async function fetchData(location = "auto:ip") {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=d0b0025ecfef4ae9ac585949231808&q=${location}&days=4`,
  );
  if (response.status === 200) {
    const currentWeather = await response.json();
    return currentWeather;
  } else {
    throw new Error(response.status);
  }
}
async function getWeather(location) {
  try {
    const fetchedData = await fetchData(location);
    const realTime = {};
    realTime.tempC = fetchedData.current.temp_c;
    realTime.tempF = fetchedData.current.temp_f;
    realTime.feelsC = fetchedData.current.feelslike_c;
    realTime.feelsF = fetchedData.current.feelslike_f;
    realTime.humidity = fetchedData.current.humidity;
    realTime.wind = fetchedData.current.wind_kph;
    realTime.cloud = fetchedData.current.cloud;
    realTime.pressure = fetchedData.current.pressure_mb;
    realTime.isDay = fetchedData.current.is_day;
    realTime.condition = fetchedData.current.condition;
    const locationData = {};
    locationData.country = fetchedData.location.country;
    locationData.time = fetchedData.location.localtime;
    locationData.city = fetchedData.location.name;
    const forecastData = fetchedData.forecast.forecastday.slice(1);
    const allData = { locationData, realTime, forecastData };
    return allData;
  } catch (err) {
    return err;
  }
}
export { getWeather };
