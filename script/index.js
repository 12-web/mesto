// ------------- переменные --------------------

const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close-btn');
const formElement = popup.querySelector('.popup__form');
const userNameInput = popup.querySelector('.popup__input_value_name');
const jobInput = popup.querySelector('.popup__input_value_profession');

const profile = document.querySelector('.profile');
const userName = profile.querySelector('.profile__name');
const profession = profile.querySelector('.profile__profession');
const profileEditBtn = profile.querySelector('.profile__edit-btn');

const likeButtons = document.querySelectorAll('.journey__like-btn');

// ------------------------------------------

// ------------- функции --------------------

// функция открытия попапа
function openPopup () {
  popup.classList.add('popup_opened');

  // присвоение полям ввода значений из текста
  userNameInput.value = userName.textContent;
  jobInput.value = profession.textContent;
}

// функция загрытия попапа
function closePopup () {
  popup.classList.remove('popup_opened');
}

// функция изменения данных профиля
function handleFormSubmit (e) {
  e.preventDefault();

  let userNameInputValue = userNameInput.value;
  let jobInputValue = jobInput.value;

  userName.textContent = userNameInputValue;
  profession.textContent = jobInputValue;

  closePopup();
}

// функция перевода кнопки сердца в активное состоние
function activateBtnHeart(item) {
  item.preventDefault();

  item.classList.toggle('journey__like-btn_active');
}

// ------------------------------------------------------

// ------------- обработчики событий --------------------

// открытие попапа
profileEditBtn.addEventListener('click', openPopup);

// закрытие попапа
popupCloseBtn.addEventListener('click', closePopup);

// отправка формы редактирования данных профиля
formElement.addEventListener('submit', handleFormSubmit);

// перевод кнопки сердца в актичное состояние
likeButtons.forEach(function(item) {

  item.addEventListener('click', activateBtnHeart(item));

});

// -------------------------------------------------------
