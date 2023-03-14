const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.popup__form');
const userNameInput = document.querySelector('.popup_value_name');
const jobInput = document.querySelector('.popup_value_profession');

const userName = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');
const profileEditBtn = document.querySelector('.profile__edit-btn');

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

// открытие попапа
profileEditBtn.addEventListener('click', openPopup);

// закрытие попапа
popupCloseBtn.addEventListener('click', closePopup);

// отправка формы редактирования данных профиля
formElement.addEventListener('submit', handleFormSubmit);
