// ------------перевод иконки сердца в активное состояние---------------
let likeButtons = document.querySelectorAll('.journey__like-btn');

// проверка наличия массива
if(likeButtons.length > 0) {

  likeButtons.forEach(function(item) {

    item.addEventListener('click', function() {
      item.firstElementChild.classList.toggle('journey__like-img_active');
    });

  });

  let likeForms = document.querySelectorAll('.journey__like-form');

  // отправка формы активации сердца
  // на данный момент - отмена перезагрузки страницы
  likeForms.forEach(function(item) {

    item.addEventListener('submit', function(e) {
      e.preventDefault();
    });

  });
}
// ------------------------------------------------------------------------------

// ---------------------перевод попапа в активное состояние----------------------
const popup = document.querySelector('.popup');
const popupCloseBtn = document.querySelector('.popup__close-btn');
const formElement = document.querySelector('.popup__form');
const userNameInput = document.querySelector('.popup__name');
const jobInput = document.querySelector('.popup__profession');

const profile = document.querySelector('.profile');
const userName = document.querySelector('.profile__name');
const profession = document.querySelector('.profile__profession');

// проверка наличия попапа
if(popup) {

  // присвоение полям ввода значений из текста
  userNameInput.value = userName.textContent;
  jobInput.value = profession.textContent;

  // функция загрытия попапа
  function closePopup () {
    popup.classList.remove('popup_opened');
  }

  // закрытие попапа
  popupCloseBtn.addEventListener('click', closePopup);


  const profileEditBtn = document.querySelector('.profile__edit-btn');

  // открытие попапа
  profileEditBtn.addEventListener('click', function() {
    popup.classList.add('popup_opened');
  });

  // функция изменения данных профиля
  function handleFormSubmit (e) {
      e.preventDefault();

      let userNameInputValue = userNameInput.value;
      let jobInputValue = jobInput.value;

      userName.textContent = userNameInputValue;
      profession.textContent = jobInputValue;

      closePopup();
  }

  // отправка формы редактирования данных профиля
  formElement.addEventListener('submit', handleFormSubmit);
}
// ------------------------------------------------------------------------------

