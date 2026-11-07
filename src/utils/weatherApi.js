import { APIkey, coordinates } from "./constants";

export function getWeather({ latitude, longitude }, APIkey) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`,
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
}

export function filterWeatherData(data) {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
  };
  result.type = getWeatherCondition(Math.round(data.main.temp));
  result.condition = data.weather[0].main; // "Clear", "Clouds", "Rain" etc.
  result.isDay =
    Date.now() / 1000 > data.sys.sunrise && Date.now() / 1000 < data.sys.sunset;
  result.icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  return result;
}

export function getWeatherCondition(temperature) {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
}
