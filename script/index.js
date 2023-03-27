// ------------------- константы ------------------------------------------------

const popupEdit = document.querySelector('.popup_type_edit');
const btnCloseEditPopup = popupEdit.querySelector('.popup__close-btn')
const formElement = popupEdit.querySelector('.popup__form');
const userNameInput = popupEdit.querySelector('.popup__input_value_name');
const jobInput = popupEdit.querySelector('.popup__input_value_profession');

const popupAdd = document.querySelector('.popup_type_add');
const btnCloseAddPopup = popupAdd.querySelector('.popup__close-btn')
const popupAddForm = popupAdd.querySelector('.popup__form');
const popupShow = document.querySelector('.popup_type_show');

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
// --------------------------------------------------------------------------------------

// ------------------- функции ----------------------------------------------------------

// функция открытия попапа
function openPopup(popapName) {
  popapName.classList.add('popup_opened');
}

// функция закрытия попапа
function closePopup(popapName) {
  popapName.classList.remove('popup_opened');
}

// функция вывода карточки на страницу
function createJourneyCard(name, link) {
  const journeyElementsContainer = document.querySelector('.journey__list');
  const journeyTemplate = document.querySelector('#journey_item').content;
  const journeyElement = journeyTemplate.querySelector('.journey__item').cloneNode(true);
  const journeyImg = journeyElement.querySelector('.journey__img');
  const btnOpenJourneyPopup = journeyElement.querySelector('.journey__img-btn');
  const btnDeleteCard = journeyElement.querySelector('.journey__delete-btn');
  const btnLikeCard = journeyElement.querySelector('.journey__like-btn');
  const btnCloseShowPopup = popupShow.querySelector('.popup__close-btn')

  journeyImg.src = link;
  journeyImg.alt = name;
  journeyElement.querySelector('.journey__title').textContent = name;

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
    const imgPopupShow = popupShow.querySelector('.popup__img');

    popupShow.classList.add('popup_opened');
    imgPopupShow.src = link;
    imgPopupShow.alt = name;
    popupShow.querySelector('.popup__caption').textContent = name;
  }

  // удаление карточки
  btnDeleteCard.addEventListener('click', deleteJourneyCard);
  // лайк карточки
  btnLikeCard.addEventListener('click', activeLikeBtn);
  // открытие попапа карточки
  btnOpenJourneyPopup.addEventListener('click', openJourneyPopup);
  // закрытие попапа карточки
  btnCloseShowPopup.addEventListener('click', () => closePopup(popupShow));
}

// вывод массива карточек на страницу
journeyElements.forEach(item => createJourneyCard(item.name, item.link));

// функция добавления новой карточки
function submitAddCardForm(e) {
  e.preventDefault();

  const elementName = popupAdd.querySelector('.popup__input_value_name');
  const elementLink = popupAdd.querySelector('.popup__input_value_link');

  createJourneyCard(elementName.value, elementLink.value);
  closePopup(popupAdd);

  elementName.value = '';
  elementLink.value = '';
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
// --------------------------------------------------------------------------------------

// ------------------- слушатели событий ------------------------------------------------

// открытие попапа редактирования профиля
profileEditBtn.addEventListener('click', () => {
  openPopup(popupEdit);

  // присвоение полям ввода значений из текста
  userNameInput.value = userName.textContent;
  jobInput.value = profession.textContent;
});

// закрытие попапа редактирования профиля
btnCloseEditPopup.addEventListener('click', () => closePopup(popupEdit));

// открытие попапа добавления карточки
btnAddCard.addEventListener('click', () => {openPopup(popupAdd)});

// закрытие попапа добавления карточки
btnCloseAddPopup.addEventListener('click', () => closePopup(popupAdd));

// отправка формы редактирования данных профиля
formElement.addEventListener('submit', submitEditProfileForm);

// добавление новой карточки
popupAddForm.addEventListener('submit', submitAddCardForm);
// --------------------------------------------------------------------------------------

