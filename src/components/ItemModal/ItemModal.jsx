import "./ItemModal.css";
import closeButton from "../../assets/close-button.png";

function ItemModal({ isOpen, onClose, card }) {
  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__content modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close-btn" onClick={onClose}>
          <img src={closeButton} alt="Close" />
        </button>
        <img className="modal__image" src={card.link} alt={card.name} />
        <div className="modal__footer">
          <p className="modal__caption">{card.name}</p>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
