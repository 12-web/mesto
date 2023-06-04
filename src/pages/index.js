import Api from '../components/Api.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm';
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import {
  userNameInput,
  userProfessionInput,
  btnOpenPopupEditProfile,
  btnOpenPopupNewCard,
  btnOpenPopupEditAvatar,
  validationConfig,
  userAvatarInput
} from '../utils/constants.js';

import './index.css';

// ======================================================================================

const formValidators = {};

// ====================== функции =======================================================

/**
 * функция открытия попапа редактирования профиля
 */
function openPopupUserInfo() {
  //внесение данных в поля формы из данных на странице
  const { userName, userProfession } = userInfo.getUserInfo();
  userNameInput.value = userName;
  userProfessionInput.value = userProfession;
  //очистка формы от текста ошибок и проверка состояния кнопки
  formValidators['user_information'].resetValidation();
  // открытие попапа
  popupEditUserInfo.open()
}

/**
 * функция открытия попапа редактирования аватара
 */
function openPopupUserAvatar() {
  //внесение данных в поле формы из данных на странице
  const { userAvatar } = userInfo.getUserInfo();
  userAvatarInput.value = userAvatar;
  //очистка формы от текста ошибок и проверка состояния кнопки
  formValidators['avatar'].resetValidation();
  // открытие попапа
  popupEditAvatar.open()
}

/**
 * функция проверки наличия лайка пользователем
 * @param {Array} likesList - массив лайков
 */
function checkLikeStatus(likesList) {
  return likesList.some(like => {
    return like._id === userInfo.userId;
  });
}

/**
 * функция добавления лайка, при котором отправляется запрос на сервер
 * @param {number} id - id карточки
 */
function addLike(card) {
  // открытие попапа
  api.addLike(card.getId())
    .then(data => {
      card.updateLikes(data.likes.length, true);
    })
    .catch((err) => { console.log(err) });
}

/**
 * функция удаления лайка, при котором отправляется запрос на сервер
 * @param {number} id - id карточки
 */
function removeLike(card) {
  // открытие попапа
  api.removeLike(card.getId())
  .then(data => {
    card.updateLikes(data.likes.length, checkLikeStatus(data.likes));
  })
    .catch((err) => { console.log(err) });
}

/**
 * функция открытия попапа просмотра картинки
 * @param {string} title - заголовок попапа
 * @param {string} link - ссылка на картинку
 */
function handleCardClick(title, link) {
  // открытие попапа
  popupShow.open(title, link);
}

/**
 * функция открытия попапа подтверждения
 * @param {Object} card - объект карточки
 */
function handleDeleteClick(card) {
  // открытие попапа
  popupDeleteCard.open(card);
}

/**
 * функция создания карточки
 * @param {Object} card - объект карточки
 */
function createCard(card) {
  const cardTemplate = new Card(card, 'journey_item', handleCardClick, handleDeleteClick, addLike, removeLike,
  { likeStatus: checkLikeStatus(card.likes) },
  { isRemovable: userInfo.userId === card.owner._id });

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

const popupShow = new PopupWithImage({
  popupSelector: '.popup_type_show',
});
// добаление обработчиков событий для попапа
popupShow.setEventListeners();

const popupNewCard = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleSubmitForm: ({ name, link }) => {
    popupNewCard.setSubmitButtonText('Сохранение...');
    api.addNewCard(name, link)
      .then(data => {
        cardsSection.appendItem(createCard(data));
        popupNewCard.close();
      })
      .catch((err) => { console.log(err) })
      .finally(() => {
        popupNewCard.setSubmitButtonText('Создать');
      });
  }
});
// добаление обработчиков событий для попапа
popupNewCard.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  professionSelector: '.profile__profession',
  avatarSelector: '.profile__img'
});

const popupEditUserInfo = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleSubmitForm: ({ name, profession }) => {
    popupEditUserInfo.setSubmitButtonText('Сохранение...');
    //добавление данных из формы на страницу
    api.editProfileData(name, profession)
      .then(data => {
        //изменение информации пользователя
        userInfo.setUserInfo({
          name: data.name,
          about: data.about
        });
        popupEditUserInfo.close();
      })
      .catch((err) => { console.log(err) })
      .finally(() => {
        popupEditUserInfo.setSubmitButtonText('Сохранить');
      });
  }
});
// добаление обработчиков событий для попапа
popupEditUserInfo.setEventListeners();

const popupEditAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleSubmitForm: ({ avatar }) => {
    popupEditAvatar.setSubmitButtonText('Сохранение...');
    api.editUserAvatar(avatar)
      .then(res => {
        userInfo.setUserImage({ avatar: res.avatar });
        popupEditAvatar.close();
      })
      .catch((err) => { console.log(err) })
      .finally(() => {
        popupEditAvatar.setSubmitButtonText('Сохранить');
      });
  }
});
// добаление обработчиков событий для попапа
popupEditAvatar.setEventListeners();

const popupDeleteCard = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-confirm',
  handleSubmitForm: (card) => {
      api.deleteCard(card.getId())
      .then(() => {
        card.deleteJourneyCard();
        popupDeleteCard.close();
      })
      .catch((err) => { console.log(err) });
  }
});
// добаление обработчиков событий для попапа
popupDeleteCard.setEventListeners();

const cardsSection = new Section({
  renderer: item => {
    const card = createCard(item);
    cardsSection.prependItem(card);
  }
  },
'.journey__list'
);

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([userData, cardsList]) => {
    // получение информации о пользователе
    userInfo.setUserInfo(userData);
    userInfo.setUserImage({ avatar: userData.avatar });
    // получение карточек
    cardsSection.renderItems(cardsList);
  })
  .catch((err) => { console.log(err) });

// запуск валидации всех форм
Array.from(document.forms).forEach(form => {
  const formValidator = new FormValidator(validationConfig, form);
  //добавление данных о валидируемой форме
  const formName = form.getAttribute('name');
  formValidators[formName] = formValidator;
  //включение валидации
  formValidator.enableValidation();
 });

// ================ слушатели событий ===================================================

// открытие попапа редактирования данных профиля
btnOpenPopupEditProfile.addEventListener('click', openPopupUserInfo);

// открытие попапа добавление новой карточки
btnOpenPopupNewCard.addEventListener('click', () => popupNewCard.open());

// открытие попапа изменения аватара пользователя
btnOpenPopupEditAvatar.addEventListener('click', openPopupUserAvatar);

// ======================================================================================
