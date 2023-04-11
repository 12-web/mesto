import { journeyElements } from './cards.js';
import { setClickEventListeners } from './validate.js';

// ====================== константы =====================================================
const popupEdit = document.querySelector('.popup_type_edit');
const popupEditForm = document.forms['edit-profile'];
const userNameInput = popupEdit.querySelector('.popup__input_value_name');
const jobInput = popupEdit.querySelector('.popup__input_value_profession');

const popupAdd = document.querySelector('.popup_type_add');
const elementName = popupAdd.querySelector('.popup__input_value_name');
const elementLink = popupAdd.querySelector('.popup__input_value_link');
const btnCloseAddPopup = popupAdd.querySelector('.popup__close-btn')
const popupAddForm = document.forms['add-card'];

const popupShow = document.querySelector('.popup_type_show');
const imgPopupShow = popupShow.querySelector('.popup__img');
const popupCaption = popupShow.querySelector('.popup__caption');

const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__name');
const profession = profile.querySelector('.profile__profession');
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const btnAddCard = profile.querySelector('.profile__add-btn');

const journeyCardsContainer = document.querySelector('.journey__list');

const closeButtons = document.querySelectorAll('.popup__close-btn');

const popupAttributes = {
  popupOpenedSelector: '.popup_opened',
  popupFormSelector: '.popup__form',
  popupOpenedClass: 'popup_opened'
}

const objValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// ======================================================================================

// ====================== функции =======================================================

//функция закрытия попапа при нажатии на escape
function closePopupViaEscape(e) {
  if(e.key === 'Escape') {
    const popupOpened = document.querySelector(popupAttributes.popupOpenedSelector);
    closePopup(popupOpened);
  }
}

//функция закрытия попапа нажатием на оверлей
function closePopupViaOverlay(e) {
  e.target === e.currentTarget && closePopup(e.currentTarget);
}

//функция добавления функции закрытия попапа через escape
function addFeauterToClosePopupViaEscape() {
  document.addEventListener('keydown', closePopupViaEscape);
}

//функция добавления функции закрытия попапа через оверлей
function addFeauterToClosePopupViaOverlay(popupName) {
  popupName.addEventListener('click', closePopupViaOverlay);
}

// функция открытия попапа
function openPopup(popupName) {
  popupName.classList.add(popupAttributes.popupOpenedClass);
  addFeauterToClosePopupViaEscape();
  addFeauterToClosePopupViaOverlay(popupName);
}

// функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove(popupAttributes.popupOpenedClass);
  //удаление обработчика закрытия попапа через escape
  document.removeEventListener('keydown', closePopupViaEscape);
  //удаление обработчика закрытия попапа через оверлей
  popupName.removeEventListener('click', closePopupViaOverlay);
}

// функция присвоения полям ввода формы значений из текста
function addInputValue(inputItem, textItem) {
  inputItem.value = textItem.textContent;
}

// функция создания карточки
function createJourneyCard(card) {
  const journeyTemplate = document.querySelector('#journey_item').content;
  const journeyCard = journeyTemplate.querySelector('.journey__item').cloneNode(true);
  const journeyImg = journeyCard.querySelector('.journey__img');
  const btnOpenJourneyPopup = journeyCard.querySelector('.journey__img-btn');
  const btnDeleteCard = journeyCard.querySelector('.journey__delete-btn');
  const btnLikeCard = journeyCard.querySelector('.journey__like-btn');
  const journeyTitle = journeyCard.querySelector('.journey__title');

  // присвоение карточке данным из массива
  journeyImg.src = card.link;
  journeyTitle.textContent = card.name;
  journeyImg.alt = card.name;

  // функция удаления карточки
  function deleteJourneyCard(e) {
    journeyCard.remove();
  }

  // функция лайка карточки
  function toggleLike(e) {
    e.target.classList.toggle('journey__like-btn_active');
  }

  // функция открытия попапа карточки
  function openJourneyPopup(popupName) {
    openPopup(popupName);
    imgPopupShow.src = card.link;
    popupCaption.textContent = card.name;
    imgPopupShow.alt = card.name;
  }

  // удаление карточки
  btnDeleteCard.addEventListener('click', deleteJourneyCard);

  // лайк карточки
  btnLikeCard.addEventListener('click', toggleLike);

  // открытие попапа карточки
  btnOpenJourneyPopup.addEventListener('click', () => {
    openJourneyPopup(popupShow);
  });

  return journeyCard;
}

// функция добавления карточки на страницу
function renderCard(item) {
  journeyCardsContainer.prepend(item);
}

// функция добавления новой карточки
function submitAddCardForm(e) {
  e.preventDefault();
  const card = {
    name: elementName.value,
    link: elementLink.value
  };

  renderCard(createJourneyCard(card));
  closePopup(popupAdd);
  popupAddForm.reset();
}

// функция изменения данных профиля
function submitEditProfileForm(e) {
  e.preventDefault();

  userName.textContent = userNameInput.value;
  profession.textContent = jobInput.value;

  closePopup(popupEdit);
}
// ======================================================================================

// ================ циклы ===============================================================

// вывод массива карточек на страницу
journeyElements.forEach(item => renderCard(createJourneyCard(item)));

// добвление обработчика закрытия попапа кнопкам закрытия
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));
});

// ======================================================================================

// ================ слушатели событий ===================================================

// открытие попапа редактирования данных профиля
profileEditBtn.addEventListener('click', () => {
  openPopup(popupEdit);
  addInputValue(userNameInput, userName);
  addInputValue(jobInput, profession);
});

// отправка формы редактирования данных профиля
popupEditForm.addEventListener('submit', submitEditProfileForm);

// открытие попапа добавления карточки
btnAddCard.addEventListener('click', () => {
  openPopup(popupAdd);
});

// добавление новой карточки
popupAddForm.addEventListener('submit', submitAddCardForm);


// запуск валидации input'тов при кликах для каждого click'а валидации
setClickEventListeners(popupEditForm, objValidation);
// запуск валидации input'тов при кликах для каждого click'а валидации
setClickEventListeners(popupAddForm, objValidation);
// ======================================================================================
