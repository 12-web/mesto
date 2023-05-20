import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._imgPopupShow = this._popup.querySelector('.popup__img');
    this._popupCaption = this._popup.querySelector('.popup__caption');
  }

  open(title, link) {
    super.open();
    // присвоение данных попапу
    this._imgPopupShow.src = link;
    this._imgPopupShow.alt = title;
    this._popupCaption.textContent = title;
  }
}
