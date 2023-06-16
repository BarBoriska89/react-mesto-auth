import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import PopupWithForm from './PopupWithForm ';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { register, authorize, getContent } from '../utils/Auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import InfoTooltip from './InfoTooltip ';



function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [userEmailOnHeader, setUserEmailOnHeader] = useState('');

  const [isSuccessfulRegistration, setIsSuccessfulRegistration] = useState(null);




  useEffect(() => {
    const promises = [api.getUser(), api.getCards()];

    const getInfo = Promise.all(promises);

    getInfo
      .then(([userData, cardList]) => {
        setCurrentUser(userData);
        setCards(cardList);
      }
      )
      .catch((err) => console.log("Ошибка запроса данных о пользователе ", err));
  }, []);

  const handleTokenCheck = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      getContent(jwt).then((res) => {

        if (res) {
          handleLogin();
          setUserEmailOnHeader(res.data.email);
          navigate("/", { replace: true })
        }
      })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    handleTokenCheck();
  }, [])

  function handleRegister(email, password) {

    console.log(email, password);
    register({ email, password })
      .then((res) => {
        console.log(res);
        setIsSuccessfulRegistration(true);
        setIsInfoTooltipPopupOpen(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessfulRegistration(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  function onLogin(email, password) {
    authorize({ email, password })
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          handleLogin();
          setUserEmailOnHeader(email);
          navigate("/", { replace: true });
        }
      })
      .catch(err => console.log(err));
  }

  const handleLogin = () => {
    setLoggedIn(true);

  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setUserEmailOnHeader('');
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleDeleteCardPopup() {
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardClick(name, link) {
    setSelectedCard({ name, link });
  }


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipPopupOpen(false);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      api.addLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log("Ошибка добавления лайка", err);
        });
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
          console.log("Ошибка удаления лайка", err);
        });
    }
  }

  function handleCardDelete(card) {

    api
      .deleteCard(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) => c._id === card._id ? "" : newCard);
        setCards(newCards);
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки", err);
      });
  }

  function handleUpdateUser(userData) {
    api.createUser(userData.name, userData.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка редактирования профиля", err);
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .patchAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка изменения аватарки", err);
      })
  }

  function handleAddPlace(data) {
    api
      .postCard({
        name: data.name,
        link: data.link,
      })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка добавления новой карточки", err);
      })
  }


  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Header userEmailOnHeader={userEmailOnHeader} onSignOut={onSignOut} />


        <Routes>
          <Route path="/" element={loggedIn ? <Navigate to="/mesto-react" replace /> : <Navigate to="/sign-in" replace />} />
          <Route path="/mesto-react" element={<ProtectedRouteElement element={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            loggedIn={loggedIn} />} />
          <Route path="/sign-in" element={<Login onLogin={onLogin} loggedIn={loggedIn} />} />
          <Route path="/sign-up" element={<Register handleRegister={handleRegister} isSuccessfulRegistration={isSuccessfulRegistration} />} />
        </Routes>



        <Footer />


        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}

        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <PopupWithForm
          isOpen={isDeleteCardPopupOpen}
          title={"Вы уверены?"}
          buttonText={"Сохранить"}
          name={"delete-place"}
          onClose={closeAllPopups}
        />

        <ImagePopup
          isOpen={selectedCard}
          onClose={closeAllPopups}
          card={selectedCard}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          name={"infotool"}
        />

      </div>
    </CurrentUserContext.Provider>


  );
}

export default App;
