import React from 'react';

function Card (props) {

  function handleClick () {
    props.onCardClick(props.card)
  }

  return (
    <div className="elements__card">
      <img className="elements__card-image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="elements__card-info">
        <h2 className="elements__card-text">{props.card.name}</h2>
        <button className="elements__card-btn" type="button"></button>
        <span className="elements__card-like-number">{props.card.likes.length}</span>
      </div>
        <button className="elements__card-basket" type="button"></button>
    </div>
  )
}

export default Card;
