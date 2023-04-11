import { popupEditForm, popupAddForm } from './index.js';

// ====================== функции =======================================================

// функция показа ошибки при вводе неверных данных в input
function showInputError(formElement, formInput, errorMessage, objValidation) {
  const errorText = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(objValidation.inputErrorClass);
  errorText.classList.add(objValidation.errorClass);
  errorText.textContent = errorMessage;
}

// функция скрытия ошибки при вводе неверных данных в input
function hideInputError(formElement, formInput, objValidation) {
  const errorText = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(objValidation.inputErrorClass);
  errorText.classList.remove(objValidation.errorClass);
  errorText.textContent = '';
}

// функция проверки input'a на валидность
function isValid(formElement, formInput, errorMessage, objValidation) {
  return !formInput.validity.valid ? showInputError(formElement, formInput, errorMessage, objValidation) : hideInputError(formElement, formInput, objValidation);
}

// функция присвоения обработчиков input'ам формы
function setInputEventListeners(formElement, objValidation) {
  const inputList = Array.from(formElement.querySelectorAll(objValidation.inputSelector));
  const btnSubmitForm = formElement.querySelector(objValidation.submitButtonSelector);

  // предварительная проверка input'ов для определения статуса кнопки
  toggleBtnForm(inputList, btnSubmitForm, objValidation);

  inputList.forEach(item => {

    item.addEventListener('input', () => {
      // проверка валидности заполняемых данных формы
      isValid(formElement, item, item.validationMessage, objValidation);
      // активация кнопки при валидности заполняемых данных формы
      toggleBtnForm(inputList, btnSubmitForm, objValidation);
    });

  });

}

// функция присвоения обработчиков кнопкам открытия попапа
function setClickEventListeners(formElement, objValidation) {
  const inputList = Array.from(formElement.querySelectorAll(objValidation.inputSelector));
  const btnSubmitForm = formElement.querySelector(objValidation.submitButtonSelector);
  const btnOpenPopup = document.getElementById(`${formElement.id}-btn`);

  inputList.forEach(item => {

    btnOpenPopup.addEventListener('click', () => {
      // активация кнопки при валидности предзаполненных данных формы
      toggleBtnForm(inputList, btnSubmitForm, objValidation);
      // сброс текста ошибок при открытии формы
      hideInputError(formElement, item, objValidation);
      });

  });

}

// функция активации валидации
function enableValidation(objValidation) {
  const formList = Array.from(document.querySelectorAll(objValidation.formSelector));

  formList.forEach(item => {
    // запуск для каждого input'а валидации
    setInputEventListeners(item, objValidation);
   });
   // запуск валидации input'тов при кликах для каждого click'а валидации
   setClickEventListeners(popupEditForm, objValidation);
   setClickEventListeners(popupAddForm, objValidation);
}

// функция перевода кнопки отправки формы в активное/неактивное состояние в зависимости от валидности input'ов
function toggleBtnForm(inputList, buttonElement, objValidation) {

  if(hasInvalidInput(inputList)) {
    buttonElement.classList.add(objValidation.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(objValidation.inactiveButtonClass);
  }

}

// функция проверки каждого input'а формы на валидность
function hasInvalidInput(inputList) {
  return inputList.some(item => !item.validity.valid);
}
// ======================================================================================

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

