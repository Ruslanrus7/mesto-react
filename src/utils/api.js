class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData (res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // загрузка карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  // добавление новой карточки
  createCard (card) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(card),
    })
    .then(this._getResponseData)
  }

  // загрузка информации о пользователе
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
    .then(this._getResponseData)
  }

  // редактирование профиля
  patchUserInfo(info) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      body: JSON.stringify(info),
      method: 'PATCH',
    })
    .then(this._getResponseData)
  }


  // обновление аватара
  patchUserAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      body: JSON.stringify(link),
      method: 'PATCH',
    })
    .then(this._getResponseData)
  }

  // удаление карточки
  deleteCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      headers:  this._headers,
      method: 'DELETE',
    })
    .then(this._getResponseData)
  }

  // поставить лайк карточки
  likeCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers:  this._headers,
      method: 'PUT',
    })
    .then(this._getResponseData)
  }

  // убрать лайк карточки
  deleteLike (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      headers:  this._headers,
      method: 'DELETE',
    })
    .then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'aabb8cb9-744a-41fd-bed2-9e4f12eba50f',
    'Content-Type': 'application/json'
  }
});

export default api;
