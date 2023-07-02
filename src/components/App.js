import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';
import api from '../utils/api.js';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const popupOpen = 'popup_opened';

  React.useEffect(()=> {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([dataUserInfo, dataInitialCards]) => {

        setCurrentUser(dataUserInfo);

        setCards(dataInitialCards);
        }
      )
      .catch(err => {
      console.log(`Ошибка: ${err}`);
      })
    }, [])

  function handleCardClick (card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick () {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups () {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardLike(card) {

    api.likeCard(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDeliteLike (card) {

    api.deleteLike(card._id)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete (card) {

    api.deleteCard(card._id)
    .then(()=> {
      setCards(cards => cards.filter((c) => c._id !== card._id));
    })
  }

  function handleUpdateUser (data) {
    api.patchUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
  }

  function handleUpdateAvatar (link) {
    api.patchUserAvatar(link)
    .then((res)=> {
      setCurrentUser(res);
      closeAllPopups();
    })
  }

  function handleAddPlaceSubmit (Card) {
    api.createCard(Card)
    .then((newCard)=> {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
  }

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main cards={cards} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDeleteLike={handleCardDeliteLike} onCardDelete={handleCardDelete}/>
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen && popupOpen} isClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen && popupOpen} isClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen && popupOpen} isClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
        <PopupWithForm title='Вы уверены?' name='delete' buttonText='Да' />
        <ImagePopup  card={selectedCard} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
