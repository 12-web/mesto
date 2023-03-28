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

const journeyCardsContainer = document.querySelector('.journey__list');

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

  journeyImg.src = card.link;
  journeyTitle.textContent = card.name;
  journeyImg.alt = card.name;

  // функция удаления карточки
  function deleteJourneyCard(e) {
    journeyCard.remove();
  }
  // функция лайка карточки
  function activeLikeBtn(e) {
    e.target.classList.toggle('journey__like-btn_active');
  }

  // функция открытия попапа карточки
  function openJourneyPopup() {
    openPopup(popupShow);
    imgPopupShow.src = card.link;
    popupCaption.textContent = card.name;
    imgPopupShow.alt = card.name;
  }

  // удаление карточки
  btnDeleteCard.addEventListener('click', deleteJourneyCard);
  // лайк карточки
  btnLikeCard.addEventListener('click', activeLikeBtn);
  // открытие попапа карточки
  btnOpenJourneyPopup.addEventListener('click', openJourneyPopup);

  return journeyCard;
}

// функция добавления карточки на страницу
function renderCard(item) {
  const journeyCard = createJourneyCard(item);

  journeyCardsContainer.prepend(journeyCard);
}

// функция добавления новой карточки
function submitAddCardForm(e) {
  e.preventDefault();
  const card = {name: elementName.value, link: elementLink.value};

  renderCard(card);
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
journeyElements.forEach(item => renderCard(item));

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
  popupAddForm.reset();
});

// закрытие попапа просмотра карточки
btnCloseShowPopup.addEventListener('click', () => closePopup(popupShow));
// ======================================================================================

