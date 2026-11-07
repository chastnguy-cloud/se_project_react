import "./WeatherCard.css";
import sunnyDay from "../../assets/sunny-day.png";
import sunnyNight from "../../assets/sunny-night.png";
import cloudyDay from "../../assets/cloudy-day.png";
import cloudyNight from "../../assets/cloudy-night.png";
import rainDay from "../../assets/rain-day.png";
import rainNight from "../../assets/rain-night.png";
import stormDay from "../../assets/storm-day.png";
import stormNight from "../../assets/storm-night.png";
import snowDay from "../../assets/snow-day.png";
import snowNight from "../../assets/snow-night.png";
import fogDay from "../../assets/fog-day.png";
import fogNight from "../../assets/fog-night.png";

const weatherImages = {
  Clear: { day: sunnyDay, night: sunnyNight },
  Clouds: { day: cloudyDay, night: cloudyNight },
  Rain: { day: rainDay, night: rainNight },
  Drizzle: { day: rainDay, night: rainNight },
  Thunderstorm: { day: stormDay, night: stormNight },
  Snow: { day: snowDay, night: snowNight },
  Mist: { day: fogDay, night: fogNight },
  Fog: { day: fogDay, night: fogNight },
  Haze: { day: fogDay, night: fogNight },
};

function WeatherCard({ weatherData }) {
  const timeOfDay = weatherData.isDay ? "day" : "night";
  const condition = weatherData.condition;
  const image = weatherImages[condition]?.[timeOfDay] || sunnyDay; // fallback to sunny day

  return (
    <div className="weather-card" style={{ backgroundImage: `url(${image})` }}>
      <p className="weather-card__temp">{weatherData.temp.F}°F</p>
    </div>
  );
}

export default WeatherCard;
