export default class Card {
  constructor(
    { name, link, owner, likes, _id }, templateId, handleCardClick, handleDeleteClick, addLike, removeLike, { likeStatus }, { isRemovable }) {
    this._title = name;
    this._link = link;
    this.ownerId = owner._id;
    this._id = _id;
    this._templateId = templateId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
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
    this._activeLikeButtonClass = 'journey__like-btn_active';
    this.likeStatus = likeStatus;
    this.isRemovable = isRemovable;
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
  _setLikesCount(likesCount) {
    this._likeCounter.textContent = likesCount;
  }

   //проверка наличия лайка нынешним пользователем
   _setLikeStatus() {
    this.likeStatus
    ? this._buttonLike.classList.add(this._activeLikeButtonClass)
    : this._buttonLike.classList.remove(this._activeLikeButtonClass);
  }

  // удаление карточки
  deleteJourneyCard() {
    this._element.remove();
    this._element = null;
  }

  // смена статуса кнопки лайка
  _toggleLike() {
    //проверка наличия лайка пользователя
    this._buttonLike.classList.contains(this._activeLikeButtonClass)
    ? this._removeLike(this)
    : this._addLike(this);
  }

  // получение id карточки
  getId() {
    return this._id;
  }

  // обновление количества и статуса лайка
  updateLikes(likesCount, likeStatus) {
    this.likeStatus = likeStatus;
    this._setLikeStatus();
    this._setLikesCount(likesCount);
  }

  // проверка возможности удаления карточки
  _checkIsRemovable() {
    this.isRemovable
    ? this._buttonDelete.addEventListener('click', () => { this._handleDeleteClick(this) })
    : this._buttonDelete.remove();
  }

  // размещение обработчиков событий
  _setEventListeners() {
    //проверка возможности удаления
    this._checkIsRemovable();
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
    // проверка создания карточки пользователем
    this.updateLikes(this._likesCount, this.likeStatus);

    this._setEventListeners();
    return this._element;
  }
}
