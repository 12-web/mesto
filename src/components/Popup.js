export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this.popupOpenedClass = 'popup_opened';
    this._popup = document.querySelector(this._popupSelector);
    this._closeBtn = this._popup.querySelector('.popup__close-btn');
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }
  // закрытие попапа через esc
  _handleEscClose(e) {
    e.key === 'Escape' && this.close();
  }
  // закрытие попапа через оверлей
  _handleOverlayClose(e) {
    e.target === e.currentTarget && this.close();
  }
  // открытие попапа
  open() {
    this._popup.classList.add(this.popupOpenedClass);
  }
  // закрытие попапа
  close() {
    this._popup.classList.remove(this.popupOpenedClass);
  }
  // добавление обработчиков событий
  setEventListeners() {
    this._closeBtn.addEventListener('click', () => this.close());
    document.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }
}
