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
      userProfession: this._profileProfession.textContent,
      userAvatar: this._profileAvatar.src
    }
  }

  // добавление данных пользователя на страницу
  setUserInfo({ name, about, _id }) {
    this._profileName.textContent = name;
    this._profileProfession.textContent = about;
    this.userId = _id;
  }

  // добавление аватара пользователя
  setUserImage({ avatar }) {
    this._profileAvatar.src = avatar;
  }
}
