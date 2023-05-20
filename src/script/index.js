import { cardsArray } from './cards.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import Section from './Section.js';

import '../pages/index.css';

// ====================== константы =====================================================
const popupEditProfile = document.querySelector('.popup_type_edit');
const userNameInput = popupEditProfile.querySelector('.popup__input_value_name');
const userProfessionInput = popupEditProfile.querySelector('.popup__input_value_profession');

const popupNewCard = document.querySelector('.popup_type_add');
const cardNameInput = popupNewCard.querySelector('.popup__input_value_name');
const cardLinkInput = popupNewCard.querySelector('.popup__input_value_link');

const profile = document.querySelector('.profile');
const btnOpenPopupEditProfile = profile.querySelector('.profile__edit-btn');
const btnOpenPopupNewCard = profile.querySelector('.profile__add-btn');

const formValidators = {};

// ======================================================================================

// ====================== функции =======================================================

// функция открытия попапа просмотра картинки
function handleCardClick(name, link) {
  const popupShowClass = new PopupWithImage({
    popupSelector: '.popup_type_show',
    name,
    link
  });
  // добаление обработчиков событий для попапа
  popupShowClass.setEventListeners();
  // открытие попапа
  popupShowClass.open();
}
// функция создания карточки
function createCard(item) {
  const cardTemplate = new Card(item, 'journey_item', handleCardClick);
  const cardCompleteElement = cardTemplate.createCard();
  return cardCompleteElement;
}

// ======================================================================================
// ================ классы ==============================================================

const popupNewCardClass = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleSubmitForm: (e) => {
    e.preventDefault();
    const cardData = { name: cardNameInput.value, link: cardLinkInput.value };
    //добавление карточки на страницу
    cards.addItem(createCard(cardData));
    // закрытие и обнуление формы
    popupNewCardClass.close();
  }
});
// добаление обработчиков событий для попапа
popupNewCardClass.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession'
});

const popupEditProfileClass = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleSubmitForm: (e) => {
    e.preventDefault();
    //добавление данных из формы на страницу
    userInfo.setUserInfo({
      newName: userNameInput.value,
      newProfession: userProfessionInput.value
    })
    // закрытие и обнуление формы
    popupEditProfileClass.close();

  }
});
// добаление обработчиков событий для попапа
popupEditProfileClass.setEventListeners();

const cards = new Section({
  items: cardsArray,
  renderer: (item) => createCard(item)
  },
'.journey__list'
);
//вывод на страницу карточек из массива
cards.generate();

// запуск валидации всех форм
Array.from(document.forms).forEach(item => {
  const formValid = new FormValidator({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
    },
    item
    );
    //добавление данных о валидируемой форме
    const formName = item.getAttribute('name');
    formValidators[formName] = formValid;
    //включение валидации
    formValid.enableValidation();
 });

// ================ слушатели событий ===================================================

// открытие попапа редактирования данных профиля
btnOpenPopupEditProfile.addEventListener('click', () => {
  // открытие попапа
  popupEditProfileClass.open()
  //внесение данных в поля формы из данных на странице
  const { userName, userProfession } = userInfo.getUserInfo();
  userNameInput.value = userName;
  userProfessionInput.value = userProfession;
  //офистка формы от текста ошибок и проверка состояния кнопки
  formValidators['user_information'].resetValidation();
});
//открытие попапа добавление новой карточки
btnOpenPopupNewCard.addEventListener('click', () => popupNewCardClass.open());
// ======================================================================================
