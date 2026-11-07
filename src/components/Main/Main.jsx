import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({ weatherData, clothingItems, onCardClick }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="main__clothes-text">
        Today is {weatherData.temp.F}° F / You may want to wear:
      </p>
      <ul className="cards__list">
        {clothingItems
          .filter((item) => item.weather === weatherData.type)
          .map((item) => (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          ))}
      </ul>
    </main>
  );
}

export default Main;
