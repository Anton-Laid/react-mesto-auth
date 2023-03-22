import PopupWithForm from './PopupWithForm';
import React, { useEffect, useRef } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatar = useRef('');

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatar.current.value,
    });
  }

  useEffect(() => {
    avatar.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      title="Обновить аватар"
      name="avatar"
      onClose={onClose}
      onSubmit={handleSubmit}
      btnText="Сохранить"
    >
      <input
        id="form-avatar"
        name="inputAvatar"
        className="popup__input popup__avatar"
        type="url"
        required
        placeholder="Ссылка на картинку"
        ref={avatar}
      />
      <span className="form-avatar-error form__input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
