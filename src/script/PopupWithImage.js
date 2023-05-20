import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector, name, link }) {
    super(popupSelector);
    this._name = name;
    this._link = link;
    this._imgPopupShow = this._popup.querySelector('.popup__img');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  open() {
    super.open();
    // присвоение данных попапу
    this._imgPopupShow.src = this._link;
    this._imgPopupShow.alt = this._name;
    this._popupCaption.textContent = this._name;
  }
}
