export default class Card {
  constructor({ name, link, owner, likes, _id }, templateId, handleCardClick, openDeletePopup, addLike, removeLike) {
    this._title = name;
    this._link = link;
    this.ownerId = owner._id;
    this.id = _id;
    this._templateId = templateId;
    this._handleCardClick = handleCardClick;
    this._openDeletePopup = openDeletePopup;
    this._element = this._getTemplateElement();
    this._cardImage = this._element.querySelector('.journey__img');
    this._buttonCardImage = this._element.querySelector('.journey__img-btn');
    this._buttonLike = this._element.querySelector('.journey__like-btn');
    this._buttonDelete = this._element.querySelector('.journey__delete-btn');
    this._cardTitle = this._element.querySelector('.journey__title');
    this._likeCounter = this._element.querySelector('.journey__like-digit');
    this._likes = likes;
    this._likesCount = this._likes.length;
    this._addLike = addLike;
    this._removeLike = removeLike;
    this._activeButtonClass = 'journey__like-btn_active';
  }
  // получение шаблона карточки
  _getTemplateElement() {
    return document
    .getElementById(this._templateId)
    .content
    .querySelector('.journey__item')
    .cloneNode(true);
  }

  // добавление количества лайков
  _setlikesCount() {
    this._likeCounter.textContent = this._likesCount;
  }

  // удаление карточки
  _deleteJourneyCard() {
    this._element.remove();
    this._element = null;
  }

  //проверка наличия лайка нынешним пользователем
  _setLikeStatus() {
    this.activeLike
    ? this._buttonLike.classList.add(this._activeButtonClass)
    : this._buttonLike.classList.remove(this._activeButtonClass);
  }

  // смена статуса кнопки лайка
  _toggleLike() {
    this._buttonLike.classList.toggle(this._activeButtonClass);
    //проверка наличия лайка пользователя
    this._buttonLike.classList.contains(this._activeButtonClass)
    ? this._addLike(this.id, this._likeCounter)
    : this._removeLike(this.id, this._likeCounter);
  }
  // проверка возможности удаления карточки
  _checkDeleteAbility() {
    this.deleteAbility
    ? this._buttonDelete.addEventListener('click', () => { this._openDeletePopup(this.id, this._element) })
    : this._buttonDelete.remove();
  }

  // размещение обработчиков событий
  _setEventListeners() {
    //проверка возможности удаления
    this._checkDeleteAbility();
    //слушатель клика для смены состояния кнопки лайка
    this._buttonLike.addEventListener('click', () => {
      this._toggleLike();
    });
    //слушатель клика для открытия попапа просмотра карточки
    this._buttonCardImage.addEventListener('click', () => { this._handleCardClick(this._title, this._link) });
  }
  // создание карточки
  createCard() {
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;

    this._setLikeStatus();
    this._setlikesCount();
    this._setEventListeners();
    return this._element;
  }
}
