import { cardsArray } from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// ====================== константы =====================================================
const popupEditProfile = document.querySelector('.popup_type_edit');
const formEditProfile = document.forms['edit-profile'];
const inputListEditProfile = formEditProfile.querySelectorAll('.popup__input');
const userNameInput = popupEditProfile.querySelector('.popup__input_value_name');
const userProfessionInput = popupEditProfile.querySelector('.popup__input_value_profession');

const popupNewCard = document.querySelector('.popup_type_add');
const cardNameInput = popupNewCard.querySelector('.popup__input_value_name');
const cardLinkInput = popupNewCard.querySelector('.popup__input_value_link');
const formNewCard = document.forms['add-card'];

const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__name');
const userProfession = profile.querySelector('.profile__profession');
const btnOpenPopupEditProfile = profile.querySelector('.profile__edit-btn');
const btnOpenPopupNewCard = profile.querySelector('.profile__add-btn');

const popupShow = document.querySelector('.popup_type_show');
const imgPopupShow = popupShow.querySelector('.popup__img');
const popupCaption = popupShow.querySelector('.popup__caption');

const cardsContainer = document.querySelector('.journey__list');

const closeButtonsList = document.querySelectorAll('.popup__close-btn');

const popupConfig = {
  popupOpenedSelector: '.popup_opened',
  popupFormSelector: '.popup__form',
  popupOpenedClass: 'popup_opened'
}

const formValidators = {};
// ======================================================================================

// ====================== функции =======================================================

//функция закрытия попапа при нажатии на escape
function closePopupWithEscape(e) {
  if(e.key === 'Escape') {
    const popupOpened = document.querySelector(popupConfig.popupOpenedSelector);
    closePopup(popupOpened);
  }
}

//функция закрытия попапа нажатием на оверлей
function closePopupWithOverlay(e) {
  e.target === e.currentTarget && closePopup(e.currentTarget);
}

// функция открытия попапа
function openPopup(popupName) {
  popupName.classList.add(popupConfig.popupOpenedClass);
  //добавление обработчика закрытия попапа через escape
  document.addEventListener('keydown', closePopupWithEscape);
  //добавление функции закрытия попапа через оверлей
  popupName.addEventListener('click', closePopupWithOverlay);
}

// функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove(popupConfig.popupOpenedClass);
  //удаление обработчика закрытия попапа через escape
  document.removeEventListener('keydown', closePopupWithEscape);
  //удаление обработчика закрытия попапа через оверлей
  popupName.removeEventListener('click', closePopupWithOverlay);
}

// функция присвоения полям ввода формы значений из текста
function addInputValue(inputItem, textItem) {
  inputItem.value = textItem.textContent;
}

// функция добавления новой карточки
function submitFormNewCard(e) {
  e.preventDefault();
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  };

  cardsContainer.prepend(createCard(cardData));

  closePopup(popupNewCard);
  formNewCard.reset();
}

// функция изменения данных профиля
function submitFormEditProfile(e) {
  e.preventDefault();

  userName.textContent = userNameInput.value;
  userProfession.textContent = userProfessionInput.value;

  closePopup(popupEditProfile);
}

function handleCardClick(name, link) {
  imgPopupShow.src = link;
  imgPopupShow.alt = name;
  popupCaption.textContent = name;
  openPopup(popupShow);
}

function createCard(item) {
  const cardTemplate = new Card(item, 'journey_item', handleCardClick);
  const cardCompleteElement = cardTemplate.createCard();
  return cardCompleteElement;
}
// ======================================================================================

// ================ циклы ===============================================================

// вывод массива карточек на страницу
cardsArray.forEach(item => {
  cardsContainer.prepend(createCard(item))
});

// запуск валидации всех форм
Array.from(document.forms).forEach(item => {
  const formValid = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
    }, item);
    //добавление данных о валидируемой форме
    const formName = item.getAttribute('name');
    formValidators[formName] = formValid;
    //включение валидации
    formValid.enableValidation();
 });

// добвление обработчика закрытия попапа кнопкам закрытия
closeButtonsList.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));
});

// ======================================================================================

// ================ слушатели событий ===================================================

// открытие попапа редактирования данных профиля
btnOpenPopupEditProfile.addEventListener('click', () => {
  openPopup(popupEditProfile);
  //внесение данных в поля формы из данных на странице
  addInputValue(userNameInput, userName);
  addInputValue(userProfessionInput, userProfession);
  formValidators['user_information'].resetValidation();
});

// отправка формы редактирования данных профиля
formEditProfile.addEventListener('submit', submitFormEditProfile);

// открытие попапа добавления карточки
btnOpenPopupNewCard.addEventListener('click', () => openPopup(popupNewCard));

// добавление новой карточки
formNewCard.addEventListener('submit', submitFormNewCard);
// ======================================================================================
