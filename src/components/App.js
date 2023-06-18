import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import React from 'react';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const popupOpen = 'popup_opened';

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


  return (
    <>
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/>
      <Footer />
      <PopupWithForm title='Редактировать профиль' name='edit' buttonText='Сохранить' isOpen={isEditProfilePopupOpen && popupOpen} isClose={closeAllPopups}>
        <input type="text" className="popup__input popup__input_type_name" placeholder="Имя" name="nameUser" id="input-name" minLength="2" maxLength="30" required />
        <span className="popup__input-error input-name-error"></span>
        <input type="text" className="popup__input popup__input_type_job" placeholder="О себе" name="jobUser" id="input-job" minLength="2" maxLength="30" required />
        <span className="popup__input-error input-job-error"></span>
      </PopupWithForm>
      <PopupWithForm title='Новое место' name='add' buttonText='Создать' isOpen={isAddPlacePopupOpen && popupOpen} isClose={closeAllPopups}>
        <input type="text" className="popup__input popup__input_type_mesto-name"  placeholder="Название" name="name" id="input-mesto-name" minLength="2" maxLength="30" required />
        <span className="popup__input-error input-mesto-name-error"></span>
        <input type="url" className="popup__input popup__input_type_image"  placeholder="Ссылка на картинку" name="link" id="input-image" required />
        <span className="popup__input-error input-image-error"></span>
      </PopupWithForm>
      <PopupWithForm title='Обновить аватар' name='avatar' buttonText='Сохранить' isOpen={isEditAvatarPopupOpen && popupOpen} isClose={closeAllPopups}>
        <input type="url" className="popup__input popup__input_type_avatar"  placeholder="Ссылка на картинку" name="avatar" id="input-avatar" required />
        <span className="popup__input-error input-avatar-error"></span>
      </PopupWithForm>
      <PopupWithForm title='Вы уверены?' name='delete' buttonText='Да' />
      <ImagePopup  card={selectedCard} onClose={closeAllPopups}/>
    </>
  );
}

export default App;
