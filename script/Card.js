export default class Card {
  constructor({ name, link }, templateId, handleCardClick) {
    this._title = name;
    this._link = link;
    this._templateId = templateId;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplateElement();
    this._cardImage = this._element.querySelector('.journey__img');
    this._buttonCardImage = this._element.querySelector('.journey__img-btn');
    this._buttonLike = this._element.querySelector('.journey__like-btn');
    this._buttonDelete = this._element.querySelector('.journey__delete-btn');
    this._cardTitle = this._element.querySelector('.journey__title');
  }
  // функция получения шаблона карточки
  _getTemplateElement() {
    return document
    .getElementById(this._templateId)
    .content
    .querySelector('.journey__item')
    .cloneNode(true);
  }
  // функция удаления карточки
  _deleteJourneyCard() {
    this._element.remove();
  }
  // функция смены статуса кнопки лайка
  _toggleLike() {
    this.classList.toggle('journey__like-btn_active');
  }
  // функция размещения обработчиков событий
  _setEventListeners() {
    //слушатель клика для удаления карточки
    this._buttonDelete.addEventListener('click', () => { this._deleteJourneyCard() });
    //слушатель клика для смены состояния кнопки лайка
    this._buttonLike.addEventListener('click', this._toggleLike);
    //слушатель клика для открытия попапа просмотра карточки
    this._buttonCardImage.addEventListener('click', () => { this._handleCardClick(this._title, this._link) });
  }
  // функция создания карточки
  createCard() {
    this._cardTitle.textContent = this._title;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._title;

    this._setEventListeners();

    return this._element;
  }
}
