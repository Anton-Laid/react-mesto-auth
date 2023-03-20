import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import unionTrue from '../images/unionTrue.png';
import unionFalse from '../images/unionFalse.png';
import ImagePopup from './imagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/Api';
import * as auth from '../utils/UseAuth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({
    imgPath: '',
    text: '',
  });

  const navigate = useNavigate();

  const [infoTooltip, setInfoTooltip] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditPhotoPopupOpen, setIsEditPhotoPopupOpen] = useState(false);
  const [isEditInfoTooltip, setIsEditInfoTooltip] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handleInfoTooltip = () => {
    setInfoTooltip(!infoTooltip);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleEditPhotoClick = () => {
    setIsEditPhotoPopupOpen(!isEditPhotoPopupOpen);
  };

  const handleEditInfoTooltip = () => {
    setIsEditInfoTooltip(!isEditInfoTooltip);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Удаление карточки
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((satate) => satate.filter((i) => i._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // обновление профеля пользователя
  function handleUpdateUser({ name, about }) {
    api
      .getRedactProfile({ name, about })
      .then((data) => {
        setCurrentUser(data);
        handleEditProfileClick();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // обновление аватара пользователя
  function handleUpdateAvatar({ avatar }) {
    api
      .getAvatarUser({ avatar })
      .then((dataAvatar) => {
        setCurrentUser(dataAvatar);
        handleEditAvatarClick();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // добавление карточки
  function opUpdataCard({ name, link }) {
    api
      .getNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleEditPhotoClick();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    Promise.all([api.getInfoUser(), api.getCardsList()])
      .then(([userData, dataCards]) => {
        setCurrentUser(userData);
        setCards(dataCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function onRegister({ password, email }) {
    auth
      .register({ password, email })
      .then((res) => {
        navigate('/');
        setInfoTooltip(true);
        setEmail(res.data.email);
        setMessage({
          imgPath: unionTrue,
          text: 'Вы успешно зарегистрировались!',
        });
      })
      .catch((err) => {
        setInfoTooltip(true);
        setMessage({
          imgPath: unionFalse,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        console.log(err);
      });
  }

  function onLogin({ password, email }) {
    auth
      .authorize({ password, email })
      .then((res) => {
        setLoggedIn(true);
        setEmail(res.data.email);
        navigate('/', { replace: true });

        if (res.jwt) {
          setLoggedIn(true);
          sessionStorage.getItem('jwt', res.jwt);
        }
      })
      .catch(() => {
        setInfoTooltip(true);
        setMessage({
          imgPath: unionFalse,
          text: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
      });
  }

  const onSingOut = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(true);
    navigate('/sing-in');
  };

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          setEmail(res.data.email);
          setLoggedIn(true);
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/sing-in" element={<Login onLogin={onLogin} />} />
          <Route
            path="/sing-up"
            element={<Register onRegister={onRegister} />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onEditAddPhoto={handleEditPhotoClick}
                cards={cards}
                handleCardLike={handleCardLike}
                handleCardDelete={handleCardDelete}
                onCardClick={(card) => handleCardClick(card)}
                loggedIn={loggedIn}
                email={email}
                onSingOut={onSingOut}
              />
            }
          />
        </Routes>

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={handleEditAvatarClick}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={handleEditProfileClick}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isEditPhotoPopupOpen}
          onClose={handleEditPhotoClick}
          opUpdataCard={opUpdataCard}
        />

        <InfoTooltip
          isOpen={infoTooltip}
          onClose={handleInfoTooltip}
          message={message}
        />
        <ImagePopup onClose={() => handleCardClick({})} card={selectedCard} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
