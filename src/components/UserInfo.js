export default class UserInfo {
  constructor({ nameSelector, professionSelector, avatarSelector }) {
    this._nameSelector = nameSelector;
    this._professionSelector = professionSelector;
    this._avatarSelector = avatarSelector;
    this._profileName = document.querySelector(this._nameSelector);
    this._profileProfession = document.querySelector(this._professionSelector);
    this._profileAvatar = document.querySelector(this._avatarSelector);
  }
  // получение данных пользователя со страницы
  getUserInfo() {
    return {
      userName: this._profileName.textContent,
      userProfession: this._profileProfession.textContent
    }
  }

  // добавление данных пользователя на страницу
  setUserInfo({ newName, newProfession, userId }) {
    this.userId = userId;
    this._profileName.textContent = newName;
    this._profileProfession.textContent = newProfession;
  }

  // добавление аватара пользователя
  setUserImage({ newAvatar }) {
    this._profileAvatar.src = newAvatar;
  }
}
