import closePopup from '../utils/utils';

function InfoTooltip({ onClose, isOpen, message, image }) {
  return (
    <div
      className={isOpen ? 'popup popup_opened' : 'popup'}
      onClick={(e) => closePopup(e, onClose)}
    >
      <div className="popup__container">
        <img src={message.imgPath} alt={image} className="popup__image" />
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        />
        <h2 className="popup__title-aut">{message.text}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
