import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__button');
  }
  // получение данных формы
  _getInputValues() {
    const formData = {};
    this._inputList.forEach(input => {
      formData[input.name] = input.value;
    });

    return formData;
  }

  // добавление текста кнопке
  setSubmitButtonText(text) {
    this._submitButton.textContent = text;
  }

  // добавление обработчиков событий
  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmitForm(this._getInputValues(), this._submitButton);
    });
  }

  // закрытие попапа
  close() {
    super.close();
    // обнуление формы
    this._form.reset();
  }
}
