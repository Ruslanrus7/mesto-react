import pen from '../images/EditButton.svg';
import api from '../utils/api.js';
import React from 'react';
import Card from './Card';

function Main (props) {

  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(()=> {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([dataUserInfo, dataInitialCards]) => {

        setUserName(dataUserInfo.name);
        setUserDescription(dataUserInfo.about);
        setUserAvatar(dataUserInfo.avatar);

        setCards(dataInitialCards);
        }
      )
      .catch(err => {
      console.log(`Ошибка: ${err}`);
      })
    }, [])



    return (
      <main className="main">
        <section className="profile page__profile">
          <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}>
            <img src={userAvatar} alt="аватарка" className="profile__avatar" />
          </button>
          <div className="profile__info">
            <div className="profile__info-content">
              <h1 className="profile__info-name">{userName}</h1>
              <p className="profile__info-text">{userDescription}</p>
            </div>
            <button className="profile__info-button" type="button" onClick={props.onEditProfile}>
              <img src={pen} alt="ручка" className="profile__info-img" />
            </button>
          </div>
          <button className="profile__button" type="button" onClick={props.onAddPlace}></button>
        </section>
        <section className="elements page__elements">
          {cards.map((dataCard) => {
            return <Card key={dataCard._id} card={dataCard} onCardClick={props.onCardClick}/>
          })}
        </section>
      </main>
    )
}

export default Main;
