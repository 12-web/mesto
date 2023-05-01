export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }
  // функция показа ошибки при вводе неверных данных в input
  _showInputError(formInput, errorMessage) {
    const errorText = this._form.querySelector(`.${formInput.id}-error`);

    formInput.classList.add(this._config.inputErrorClass);
    errorText.classList.add(this._config.errorClass);
    errorText.textContent = errorMessage;
  }
  // функция скрытия ошибки при вводе неверных данных в input
  _hideInputError(formInput) {
    const errorText = this._form.querySelector(`.${formInput.id}-error`);

    formInput.classList.remove(this._config.inputErrorClass);
    errorText.classList.remove(this._config.errorClass);
    errorText.textContent = '';
  }
  // функция проверки input'a на валидность
  _isValid(formInput, errorMessage) {
    return !formInput.validity.valid
    ? this._showInputError(formInput, errorMessage)
    : this._hideInputError(formInput);
  }
  // функция дезактивации кнопки отправки формы
  _deactivateSubmitButton(submitBtn) {
    submitBtn.classList.add(this._config.inactiveButtonClass);
    submitBtn.setAttribute('disabled', '');
  }
  // функция активации кнопки отправки формы
  _activateSubmitButton(submitBtn) {
    submitBtn.classList.remove(this._config.inactiveButtonClass);
    submitBtn.removeAttribute('disabled');
  }
  // функция изменения статуса кнопки в зависимости от валидности формы
  _toggleBtnForm(submitBtn) {
    return this._form.checkValidity()
    ? this._activateSubmitButton(submitBtn)
    : this._deactivateSubmitButton(submitBtn);
  }
  // функция присвоения обработчиков input'ам формы
  _setInputEventListeners() {
    const inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    const btnSubmitForm = this._form.querySelector(this._config.submitButtonSelector);

    // предварительная проверка input'ов для определения статуса кнопки
    this._toggleBtnForm(btnSubmitForm);

    inputList.forEach(item => {

      item.addEventListener('input', () => {
        // проверка валидности заполняемых данных формы
        this._isValid(item, item.validationMessage);
        // активация кнопки при валидности заполняемых данных формы
        this._toggleBtnForm(btnSubmitForm);
      });

    });

    this._form.addEventListener('reset', () => { this._deactivateSubmitButton(btnSubmitForm) });
  }
  //функция активации валидации формы
  enableValidation() {
    // запуск для каждого input'а валидации
    this._setInputEventListeners();
  }
}
