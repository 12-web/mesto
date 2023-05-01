import { openPopup } from './index.js';

const popupShow = document.querySelector('.popup_type_show');
const imgPopupShow = popupShow.querySelector('.popup__img');
const popupCaption = popupShow.querySelector('.popup__caption');

export default class Card {
  constructor({ name, link }, templateId) {
    this._title = name;
    this._link = link;
    this._templateId = templateId;
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
  // функция открытия попапа просмотра картинки
  _openJourneyPopup() {
    openPopup(popupShow);

    imgPopupShow.src = this._link;
    popupCaption.textContent = this._title;
    imgPopupShow.alt = this._title;
  }
  // функция размещения обработчиков событий
  _setEventListeners() {
    //слушатель клика для удаления карточки
    this._element.querySelector('.journey__delete-btn').addEventListener('click', () => { this._deleteJourneyCard() });
    //слушатель клика для смены состояния кнопки лайка
    this._element.querySelector('.journey__like-btn').addEventListener('click', this._toggleLike);
    //слушатель клика для открытия попапа просмотра карточки
    this._element.querySelector('.journey__img-btn').addEventListener('click', () => { this._openJourneyPopup() });
  }
  // функция создания карточки
  createCard() {
    this._element = this._getTemplateElement();
    const cardImg = this._element.querySelector('.journey__img');

    this._element.querySelector('.journey__title').textContent = this._title;
    cardImg.src = this._link;
    cardImg.alt = this._title;

    this._setEventListeners();

    return this._element;
  }
}
