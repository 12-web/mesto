// ====================== константы =====================================================
const popupEdit = document.querySelector('.popup_type_edit');
const btnCloseEditPopup = popupEdit.querySelector('.popup__close-btn')
const formElement = popupEdit.querySelector('.popup__form');
const userNameInput = popupEdit.querySelector('.popup__input_value_name');
const jobInput = popupEdit.querySelector('.popup__input_value_profession');

const popupAdd = document.querySelector('.popup_type_add');
const elementName = popupAdd.querySelector('.popup__input_value_name');
const elementLink = popupAdd.querySelector('.popup__input_value_link');
const btnCloseAddPopup = popupAdd.querySelector('.popup__close-btn')
const popupAddForm = popupAdd.querySelector('.popup__form');

const popupShow = document.querySelector('.popup_type_show');
const imgPopupShow = popupShow.querySelector('.popup__img');
const popupCaption = popupShow.querySelector('.popup__caption');
const btnCloseShowPopup = popupShow.querySelector('.popup__close-btn');

const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__name');
const profession = profile.querySelector('.profile__profession');
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const btnAddCard = profile.querySelector('.profile__add-btn');

const journeyElements = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// ======================================================================================

// ====================== функции =======================================================

// функция открытия попапа
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
}

// функция закрытия попапа
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
}

 // функция очистки поля ввода формы
 function clearInputValue(...items) {
  items.forEach(item => item.value = '');
}

// функция присвоения полям ввода формы значений из текста
function addInputValue(inputItem, textItem) {
  inputItem.value = textItem.textContent;
}

// функция добавления карточки на страницу
function createJourneyCard(name, link) {
  const journeyElementsContainer = document.querySelector('.journey__list');
  const journeyTemplate = document.querySelector('#journey_item').content;
  const journeyElement = journeyTemplate.querySelector('.journey__item').cloneNode(true);
  const journeyImg = journeyElement.querySelector('.journey__img');
  const btnOpenJourneyPopup = journeyElement.querySelector('.journey__img-btn');
  const btnDeleteCard = journeyElement.querySelector('.journey__delete-btn');
  const btnLikeCard = journeyElement.querySelector('.journey__like-btn');
  const journeyTitle = journeyElement.querySelector('.journey__title');

  journeyImg.src = link;
  journeyTitle.textContent = name;
  journeyImg.alt = name;

  journeyElementsContainer.prepend(journeyElement);

  // функция удаления карточки
  function deleteJourneyCard(e) {
    e.target.closest('.journey__item').remove();
  }
  // функция лайка карточки
  function activeLikeBtn(e) {
    e.target.classList.toggle('journey__like-btn_active');
  }

  // функция открытия попапа карточки
  function openJourneyPopup() {
    popupShow.classList.add('popup_opened');
    imgPopupShow.src = link;
    popupCaption.textContent = name;
    imgPopupShow.alt = name;
  }

  // удаление карточки
  btnDeleteCard.addEventListener('click', deleteJourneyCard);
  // лайк карточки
  btnLikeCard.addEventListener('click', activeLikeBtn);
  // открытие попапа карточки
  btnOpenJourneyPopup.addEventListener('click', openJourneyPopup);
}

// функция добавления новой карточки
function submitAddCardForm(e) {
  e.preventDefault();

  createJourneyCard(elementName.value, elementLink.value);
  closePopup(popupAdd);
  clearInputValue(elementName, elementLink);
}

// функция изменения данных профиля
function submitEditProfileForm(e) {
  e.preventDefault();

  const userNameInputValue = userNameInput.value;
  const jobInputValue = jobInput.value;

  userName.textContent = userNameInputValue;
  profession.textContent = jobInputValue;

  closePopup(popupEdit);
}
// ======================================================================================

// ================ циклы ===============================================================

// вывод массива карточек на страницу
journeyElements.forEach(item => createJourneyCard(item.name, item.link));

// ======================================================================================

// ================ слушатели событий ===================================================

// открытие попапа редактирования данных профиля
profileEditBtn.addEventListener('click', () => {
  openPopup(popupEdit);
  addInputValue(userNameInput, userName);
  addInputValue(jobInput, profession);
});

// отправка формы редактирования данных профиля
formElement.addEventListener('submit', submitEditProfileForm);

// закрытие попапа редактирования данных профиля
btnCloseEditPopup.addEventListener('click', () => closePopup(popupEdit));

// открытие попапа добавления карточки
btnAddCard.addEventListener('click', () => openPopup(popupAdd));

// добавление новой карточки
popupAddForm.addEventListener('submit', submitAddCardForm);

// закрытие попапа добавления карточки
btnCloseAddPopup.addEventListener('click', () => {
  closePopup(popupAdd);
  clearInputValue(elementName, elementLink);
});

// закрытие попапа просмотра карточки
btnCloseShowPopup.addEventListener('click', () => closePopup(popupShow));
// ======================================================================================

