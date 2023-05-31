import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';

import './index.css';

// ====================== константы =====================================================
const popupEditProfile = document.querySelector('.popup_type_edit');
const userNameInput = popupEditProfile.querySelector('.popup__input_value_name');
const userProfessionInput = popupEditProfile.querySelector('.popup__input_value_profession');

const profile = document.querySelector('.profile');
const btnOpenPopupEditProfile = profile.querySelector('.profile__edit-btn');
const btnOpenPopupNewCard = profile.querySelector('.profile__add-btn');
const btnOpenPopupEditAvatar = profile.querySelector('.profile__edit-avatar');

const formValidators = {};

// ======================================================================================

// ====================== функции =============================
//функция присвоения лайков счетчику
function showLikesCount(likeCounter, likes) {
  likeCounter.textContent = likes;
}

//функция добавления лайка
function addLike(id, likeCounter) {
  // открытие попапа
  api.addLike(id)
    .then(res => {
      if(res.ok) {
        console.log(id);
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => showLikesCount(likeCounter, data.likes.length))
    .catch((err) => { console.log(err) });
}

//функция удаления лайка
function removeLike(id, likeCounter) {
  // открытие попапа
  api.removeLike(id)
    .then(res => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(data => showLikesCount(likeCounter, data.likes.length))
    .catch((err) => { console.log(err) });
}

// функция открытия попапа просмотра картинки
function handleCardClick(title, link) {
  // открытие попапа
  popupShowClass.open(title, link);
}

// функция открытия попапа подтверждения
function openDeletePopup(id, card) {
  popupDeleteCardClass.id = id;
  popupDeleteCardClass.card = card;
  // открытие попапа
  popupDeleteCardClass.open();
  formValidators['delete_confirm'].resetValidation();
}

// функция создания карточки
function createCard(item) {
  const cardTemplate = new Card(item, 'journey_item', handleCardClick, openDeletePopup, addLike, removeLike);
  // проверка создания карточки пользователем
  userInfo.userId === cardTemplate.ownerId
  ? cardTemplate.deleteAbility = true
  : cardTemplate.deleteAbility = false;
  // проверка наличия лайка пользователем
  item.likes.forEach(item => {
    item._id === userInfo.userId
    ? cardTemplate.activeLike = true
    : cardTemplate.activeLike = false;
  });

  const cardCompleteElement = cardTemplate.createCard();
  return cardCompleteElement;
}
// ======================================================================================
// ================ классы ==============================================================

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '14b13473-1b56-4228-afac-2edb4b448b71',
    'Content-Type': 'application/json',
  }
});

const popupShowClass = new PopupWithImage({
  popupSelector: '.popup_type_show',
});
// добаление обработчиков событий для попапа
popupShowClass.setEventListeners();

const popupNewCardClass = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleSubmitForm: ({ name, link }, button) => {
    button.textContent = 'Сохранение...';
    api.addNewCard(name, link)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        const cardData = {name: data.name, link: data.link, likes: data.likes, owner: data.owner}
        //добавление карточки на страницу
        cards.addItem(createCard(cardData));
      })
      .catch((err) => { console.log(err) })
      .finally(() => {
        button.textContent = 'Создать'
      });
  }
});
// добаление обработчиков событий для попапа
popupNewCardClass.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession',
  avatarSelector: '.profile__img'
});


// получение информации о пользователе
api.getUserInformation()
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(res => {
    userInfo.setUserInfo({
      newName: res.name,
      newProfession: res.about,
      userId: res._id
    });
    userInfo.setUserImage({ newAvatar: res.avatar });
  })
  .catch((err) => { console.log(err) });


const popupEditProfileClass = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleSubmitForm: ({ name, profession }, button) => {
    button.textContent = 'Сохранение...';
    //добавление данных из формы на страницу
    api.editProfileData(name, profession)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        //изменение информации пользователя
        userInfo.setUserInfo({
          newName: data.name,
          newProfession: data.about
        })
      })
      .catch((err) => { console.log(err) })
      .finally(() => {
        button.textContent = 'Сохранить'
      });
  }
});
// добаление обработчиков событий для попапа
popupEditProfileClass.setEventListeners();

const popupEditAvatarClass = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleSubmitForm: ({ avatar }, button) => {
    button.textContent = 'Сохранение...';
    api.editUserAvatar(avatar)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => {
        userInfo.setUserImage({ newAvatar: res.avatar });
      })
      .catch((err) => { console.log(err) })
      .finally(() => {
        button.textContent = 'Сохранить'
      });
  }
});
// добаление обработчиков событий для попапа
popupEditAvatarClass.setEventListeners();

const popupDeleteCardClass = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-confirm',
  handleSubmitForm: (id, card) => {
    card.remove();
      api.deleteCard(id)
      .then(res => {
        if(res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(res => console.log(res))
      .catch((err) => { console.log(err) });
  }
});
// добаление обработчиков событий для попапа
popupDeleteCardClass.setEventListeners();

const cards = new Section({
  renderer: (item) => createCard(item)
  },
'.journey__list'
);

// получение карточек с сервера
api.getInitialCards()
  .then(res => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  })
  .then(items => { cards.generate(items) }) //вывод на страницу карточек из массива
  .catch((err) => { console.log(err) });

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

btnOpenPopupEditAvatar.addEventListener('click', () => popupEditAvatarClass.open());
// ======================================================================================
