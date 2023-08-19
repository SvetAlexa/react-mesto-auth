import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";
import PageNotFound from "./PageNotFound";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as auth from '../utils/auth';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState({ isOpen: false, cards: {} });
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState('');

  const [cards, setCards] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);

  const [registerStatus, setRegisterStatus] = useState({ status: false, title: '' });

  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    api.getAllInfo()
      .then(([userData, cardsArray]) => {
        setCurrentUser(userData);
        setCards(cardsArray);
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
  }, [])

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteClick(card) {
    setIsDeletePopupOpen({ isOpen: true, card: card });
  }

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups()
    }
  }

  function handleEscClick(evt) {
    const key = evt.key;
    if (key === 'Escape') {
      closeAllPopups()
    }
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen({ isOpen: false, cards: {} })
    setIsInfoTooltipOpen(false)
    document.removeEventListener('keydown', handleEscClick)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id) // определяем, есть ли у карточки лайк, поставленный текущим пользователем
    api.swapLike(card._id, isLiked) // отправляем запрос в API и получаем обновленные данные карточки
      .then((newCard) => {
        setCards((state) =>
          state.map((item) =>
            item._id === card._id ? newCard : item)
        )
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    api.removeCard(card._id)
      .then(() => {
        setCards((state) => {
          return state.filter((item) =>
            item._id !== card._id
          )
        })
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true)
    api.setUserInfo(userInfo)
      .then((userInfoUpdated) => {
        setCurrentUser(userInfoUpdated);
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }


  function handleUpdateAvatar(avatar) {
    setIsLoading(true)
    api.setAvatarPhoto(avatar)
      .then((userInfoUpdated) => {
        setCurrentUser(userInfoUpdated);
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true)
    api.createNewCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Произошла ошибка: ${err}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleLogin(value, setFormValue) {
    const { email, password } = value;
    auth.authorize(email, password)
            .then((data) => {
                console.log(data)
                if (data.token) {
                    console.log(data.token)
                    // setFormValue({ username: '', password: '' });
                    setFormValue({ username: '', password: '' });
                    setLoggedIn(true);
                    setEmail(email);
                    navigate('/', { replace: true });
                }
            })
            .catch((err) => {
                console.error(`Произошла ошибка: ${err}`)
                setIsInfoTooltipOpen(true)
                setRegisterStatus({
                    status: false,
                    title: 'Что-то пошло не так! Попробуйте ещё раз.'
                })
            })
    
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email}/>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDeleteButton={handleDeleteClick}
              cards={cards}
              loggedIn={loggedIn}
            />
          } />
          <Route path='/sign-up' element={<Register
            setRegisterStatus={setRegisterStatus}
            setIsInfoTooltipOpen={setIsInfoTooltipOpen} />} />
          <Route path='/sign-in' element={<Login onLogin={handleLogin}
            setRegisterStatus={setRegisterStatus}
            setIsInfoTooltipOpen={setIsInfoTooltipOpen} />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        onOverlay={handleOverlayClick}
        onEscClick={handleEscClick} />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        onOverlay={handleOverlayClick}
        onEscClick={handleEscClick} />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        onOverlay={handleOverlayClick}
        onEscClick={handleEscClick} />
      <DeleteCardPopup
        isOpen={isDeletePopupOpen.isOpen}
        isLoading={isLoading}
        card={isDeletePopupOpen.card}
        onClose={closeAllPopups}
        onCardDelete={handleCardDelete}
        onOverlay={handleOverlayClick}
        onEscClick={handleEscClick} />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
        onOverlay={handleOverlayClick}
        onEscClick={handleEscClick}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        onOverlay={handleOverlayClick}
        onEscClick={handleEscClick}
        registerStatus={registerStatus}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;