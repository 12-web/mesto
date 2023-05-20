import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._formData = {};
  }
  // получение данных формы
  _getInputValues() {
    this._inputList.forEach(input => {
      this._formData[input.name] = input.value;
    });

  return this._formData;
  }
  // добавление обработчиков событий
  setEventListeners() {
    super.setEventListeners();
    //получение данных формы
    this._form.addEventListener('submit', () => { this._getInputValues() });
    //отправка формы
    this._form.addEventListener('submit', this._handleSubmitForm);
  }

  close() {
    super.close();
    // обнуление формы
    this._form.reset();
  }
}
