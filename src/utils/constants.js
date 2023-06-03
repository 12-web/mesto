const popupEditProfile = document.querySelector('.popup_type_edit');
const userNameInput = popupEditProfile.querySelector('.popup__input_value_name');
const userProfessionInput = popupEditProfile.querySelector('.popup__input_value_profession');
const userAvatarInput = document.querySelector('.popup__input_value_avatar');

const profile = document.querySelector('.profile');
const btnOpenPopupEditProfile = profile.querySelector('.profile__edit-btn');
const btnOpenPopupNewCard = profile.querySelector('.profile__add-btn');
const btnOpenPopupEditAvatar = profile.querySelector('.profile__edit-avatar');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export {
  userNameInput,
  userProfessionInput,
  btnOpenPopupEditProfile,
  btnOpenPopupNewCard,
  btnOpenPopupEditAvatar,
  validationConfig,
  userAvatarInput
};
