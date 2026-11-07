import { useState, useEffect } from "react";
import { defaultClothingItems } from "../../utils/clothingItems";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey } from "../../utils/constants";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999 },
    city: "",
  });

  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [newItemName, setNewItemName] = useState("");
  const [newItemImageUrl, setNewItemImageUrl] = useState("");
  const [newItemWeather, setNewItemWeather] = useState("");

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  function handleAddClick() {
    setActiveModal("add-garment");
  }

  function handleCardClick(card) {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleAddItemSubmit(e) {
    e.preventDefault();
    const newItem = {
      _id: clothingItems.length + 1,
      name: newItemName,
      link: newItemImageUrl,
      weather: newItemWeather,
    };
    setClothingItems([newItem, ...clothingItems]);
    handleCloseModal();
  }

  return (
    <div className="app">
      <Header weatherData={weatherData} onAddClick={handleAddClick} />
      <Main
        weatherData={weatherData}
        clothingItems={clothingItems}
        onCardClick={handleCardClick}
      />
      <Footer />
      <ModalWithForm
        title="New Garment"
        name="add-garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
        onSubmit={handleAddItemSubmit}
        isDisabled={
          !newItemName || !newItemImageUrl.startsWith("http") || !newItemWeather
        }
      >
        <label className="modal__label">
          Name
          <input
            className="modal__input"
            type="text"
            placeholder="Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
        </label>
        <label className="modal__label">
          <span className="modal__label-title">
            Image
            {newItemImageUrl && !newItemImageUrl.startsWith("http") && (
              <span className="modal__error">
                * (This is not a valid image link)
              </span>
            )}
          </span>
          <input
            className="modal__input"
            type="url"
            placeholder="Image URL"
            value={newItemImageUrl}
            onChange={(e) => setNewItemImageUrl(e.target.value)}
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="weather"
              value="hot"
              onChange={(e) => setNewItemWeather(e.target.value)}
            />{" "}
            Hot
          </label>
          <label className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="weather"
              value="warm"
              onChange={(e) => setNewItemWeather(e.target.value)}
            />{" "}
            Warm
          </label>
          <label className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="weather"
              value="cold"
              onChange={(e) => setNewItemWeather(e.target.value)}
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
        card={selectedCard}
      />
    </div>
  );
}

export default App;
