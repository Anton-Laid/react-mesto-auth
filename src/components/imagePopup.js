import closePopup from '../utils/utils';

function ImagePopup(props) {
  const { card, onClose } = props;
  return (
    <div
      className={card.link ? 'popup__photo popup__photo-open' : 'popup__photo'}
      onClick={(e) => closePopup(e, onClose)}
    >
      <div className="popup-foto__box">
        <img className="popup-foto__images" src={card.link} alt={card.name} />
        <p className="popup-foto__title">{card.name}</p>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
