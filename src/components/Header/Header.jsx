import "./Header.css";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png";

function Header({ weatherData, onAddClick }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR" />
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <button className="header__add-clothes-btn" onClick={onAddClick}>
        + Add clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" src={avatar} alt="Terrence Tegegne" />
      </div>
    </header>
  );
}

export default Header;
